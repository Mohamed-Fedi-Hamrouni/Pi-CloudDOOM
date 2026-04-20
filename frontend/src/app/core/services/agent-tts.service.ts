import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { environment } from "../../../environments/environment";
import { BrowserTtsService } from "./browser-tts.service";

export interface AgentSpeakOptions {
  lang?: string;
  /**
   * Optionally pass a backend TTS voice ID.
   * Omit to let the backend use its configured default.
   * Do NOT hard-code "recruiter_en" — that value is not a valid ID
   * for any standard TTS provider and causes a 422 from the backend.
   */
  voice?: string;
  preferRemote?: boolean;
  /** Defaults to true — always fall back to browser TTS when remote fails. */
  allowBrowserFallback?: boolean;
}

@Injectable({ providedIn: "root" })
export class AgentTtsService {
  private readonly http = inject(HttpClient);
  private readonly browserTts = inject(BrowserTtsService);
  private readonly base = environment.interviewApiUrl;

  private remoteAvailable: boolean | null = null;

  private async checkRemoteAvailable(): Promise<boolean> {
    if (this.remoteAvailable !== null) return this.remoteAvailable;
    try {
      const res = await firstValueFrom(
        this.http.get<{ available: boolean }>(`${this.base}/api/live-voice/available`),
      );
      this.remoteAvailable = res.available;
    } catch {
      this.remoteAvailable = false;
    }
    return this.remoteAvailable ?? false;
  }

  /** Force-reset the remote-available cache (e.g. after a new session starts). */
  resetAvailabilityCache(): void {
    this.remoteAvailable = null;
  }

  async speak(text: string, options: AgentSpeakOptions = {}): Promise<void> {
    const cleanText = (text ?? "").trim();
    if (!cleanText) return;

    const preferRemote = options.preferRemote ?? true;
    // Default to true — browser TTS is the safe fallback, never leave the user in silence.
    const allowBrowserFallback = options.allowBrowserFallback ?? true;

    if (preferRemote && (await this.checkRemoteAvailable())) {
      try {
        console.log("[AgentTTS] Trying remote TTS:", cleanText);

        // Build the request body without a voice override unless the caller
        // explicitly provides one.  Hard-coding "recruiter_en" causes 422 from
        // the backend DTO validator because it is not a recognised provider voice ID.
        const body: Record<string, string> = {
          text: cleanText,
          lang: options.lang ?? "en-US",
        };
        if (options.voice) {
          body["voice"] = options.voice;
        }

        const blob = await firstValueFrom(
          this.http.post(
            `${this.base}/api/live-voice/speak`,
            body,
            { responseType: "blob" },
          ),
        );

        console.log(
          "[AgentTTS] Remote TTS success:",
          blob.size,
          blob.type || "unknown",
        );
        await this.playBlob(blob);
        return;
      } catch (error: any) {
        const status: number = error?.status ?? 0;
        console.warn(
          `[AgentTTS] Remote TTS failed (HTTP ${status}) — switching to browser TTS.`,
          error?.message ?? error,
        );
        // Mark remote as unavailable for the rest of this service lifetime
        // so we don't keep hammering a broken endpoint.
        this.remoteAvailable = false;

        if (!allowBrowserFallback) {
          throw error;
        }
      }
    }

    console.log("[AgentTTS] Using browser TTS");
    await this.browserTts.speak(cleanText, options.lang ?? "en-US");
  }

  stop(): void {
    this.browserTts.stop();
  }

  private async playBlob(blob: Blob): Promise<void> {
    if (!blob || blob.size === 0) {
      throw new Error("Empty audio blob returned from remote TTS");
    }

    const objectUrl = URL.createObjectURL(blob);

    try {
      const audio = new Audio(objectUrl);

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => resolve();
        audio.onerror = () => reject(new Error("Audio playback failed"));
        audio.play().catch(reject);
      });
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }
}