# ================================================================
# anti_cheat_service.py — Microservice Python Anti-Triche
# Port : 8686
#
# Fonctionnalités :
#   ✅ Réception des événements Angular (blur, tab, clipboard...)
#   ✅ Process Tracker : détection de logiciels suspects actifs
#   ✅ YOLOv8 Nano : analyse visuelle des screenshots (optionnel)
#   ✅ Log centralisé des infractions par attemptId
#   ✅ Endpoint de résumé pour l'admin
#
# Installation :
#   pip install fastapi uvicorn psutil pillow ultralytics
#
# YOLOv8 Nano (6MB) — téléchargé automatiquement au 1er lancement
# Aucune installation supplémentaire, aucun Ollama.
#
# Lancement :
#   uvicorn anti_cheat_service:app --host 0.0.0.0 --port 8686
# ================================================================

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import psutil
import base64
import io
import json
import os
import logging
from collections import defaultdict

logging.basicConfig(level=logging.INFO, format='%(asctime)s [AntiCheat] %(message)s')
log = logging.getLogger(__name__)

app = FastAPI(title="Anti-Cheat Service", version="1.0.0")

# CORS — autorise le frontend Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ══ YOLO — chargé optionnellement ══════════════════════════════
yolo_model = None

def load_yolo():
    global yolo_model
    try:
        from ultralytics import YOLO
        # YOLOv8 Nano — 6MB, téléchargé dans ~/.cache/ultralytics au 1er lancement
        yolo_model = YOLO("yolov8n.pt")
        log.info("YOLOv8 Nano chargé avec succès")
    except ImportError:
        log.warning("ultralytics non installé — analyse visuelle désactivée")
    except Exception as e:
        log.warning(f"YOLO non disponible : {e}")

# Charger YOLO au démarrage (non bloquant si indisponible)
try:
    load_yolo()
except Exception:
    pass

# ══ STOCKAGE EN MÉMOIRE (remplacer par DB en production) ════════
# { attemptId: [{ type, details, timestamp, severity }] }
incidents: dict = defaultdict(list)

# ══ PROCESSUS SUSPECTS ══════════════════════════════════════════
SUSPICIOUS_PROCESSES = [
    # Outils de capture
    "snippingtool", "snipping tool", "screenshot", "greenshot",
    "lightshot", "sharex", "picpick", "faststone", "flameshot",
    "hypersnap", "snagit", "camtasia",
    # OCR / reconnaissance
    "tesseract", "ocrmypdf",
    # Partage d'écran
    "discord", "teams", "zoom", "skype", "obs", "obs64",
    "obs32", "streamlabs", "xsplit",
    # Remote desktop
    "teamviewer", "anydesk", "rustdesk", "vnc", "ultravnc",
    "rdpclip", "mstsc",
    # IA assistants (peuvent lire l'écran)
    "copilot", "cortana",
    # Triche générale
    "autoclicker", "autohotkey", "ahk",
]

def get_running_processes() -> List[str]:
    """Retourne la liste des noms de processus actuellement actifs."""
    try:
        return [p.name().lower() for p in psutil.process_iter(['name'])]
    except Exception:
        return []

def detect_suspicious_processes() -> List[str]:
    """Retourne les processus suspects trouvés."""
    running = get_running_processes()
    found = []
    for susp in SUSPICIOUS_PROCESSES:
        for proc in running:
            if susp in proc:
                found.append(proc)
    return list(set(found))

# ══ MODÈLES PYDANTIC ════════════════════════════════════════════

class CheatEvent(BaseModel):
    attemptId: str
    type: str
    details: Optional[str] = None
    timestamp: Optional[str] = None

class ScreenshotRequest(BaseModel):
    attemptId: str
    imageBase64: str          # Image PNG en base64
    mimeType: str = "image/png"

class ProcessCheckRequest(BaseModel):
    attemptId: Optional[str] = None

# ══ ENDPOINTS ═══════════════════════════════════════════════════

@app.get("/health")
def health():
    return {
        "status": "ok",
        "yolo_available": yolo_model is not None,
        "timestamp": datetime.now().isoformat()
    }

# ── Réception d'un événement Angular ────────────────────────────
@app.post("/api/anticheat/event")
def receive_event(event: CheatEvent):
    """
    Reçoit un événement de triche depuis Angular.
    Enregistre et retourne la sévérité.
    """
    severity = get_severity(event.type)

    record = {
        "type":      event.type,
        "details":   event.details,
        "timestamp": event.timestamp or datetime.now().isoformat(),
        "severity":  severity,
        "source":    "angular",
    }

    incidents[event.attemptId].append(record)
    count = len(incidents[event.attemptId])

    log.info(f"[{event.attemptId}] Incident #{count} — {event.type} ({severity}) — {event.details}")

    return {
        "recorded":       True,
        "incidentCount":  count,
        "severity":       severity,
        "shouldTerminate": count >= 2 or severity == "CRITICAL",
    }

# ── Vérification des processus ───────────────────────────────────
@app.post("/api/anticheat/check-processes")
def check_processes(req: ProcessCheckRequest):
    """
    Vérifie si des processus suspects tournent.
    Appelé régulièrement par Angular (toutes les 30s).
    """
    suspicious = detect_suspicious_processes()

    if suspicious and req.attemptId:
        record = {
            "type":      "SUSPICIOUS_PROCESS",
            "details":   f"Processus suspects : {', '.join(suspicious)}",
            "timestamp": datetime.now().isoformat(),
            "severity":  "HIGH",
            "source":    "process_tracker",
        }
        incidents[req.attemptId].append(record)
        log.warning(f"[{req.attemptId}] Processus suspects : {suspicious}")

    return {
        "suspicious": len(suspicious) > 0,
        "processes":  suspicious,
        "count":      len(suspicious),
    }

# ── Analyse visuelle YOLOv8 ──────────────────────────────────────
@app.post("/api/anticheat/analyze-screenshot")
def analyze_screenshot(req: ScreenshotRequest):
    """
    Analyse un screenshot avec YOLOv8.
    Détecte les éléments suspects : barres d'outils Snipping Tool,
    fenêtres superposées, etc.
    """
    if yolo_model is None:
        return {
            "analyzed": False,
            "suspicious": False,
            "reason": "YOLOv8 non disponible",
        }

    try:
        from PIL import Image
        import numpy as np

        # Décoder le base64
        img_data = base64.b64decode(req.imageBase64)
        img = Image.open(io.BytesIO(img_data)).convert("RGB")
        img_array = np.array(img)

        # Inférence YOLO
        results = yolo_model(img_array, verbose=False)[0]

        # Extraire les classes détectées
        # YOLOv8 Nano (COCO) : on cherche 'laptop', 'cell phone', 'tv', etc.
        detected_classes = []
        suspicious_classes = {'laptop', 'cell phone', 'tv', 'monitor', 'book', 'remote'}

        for box in results.boxes:
            cls_id = int(box.cls[0].item())
            cls_name = results.names[cls_id]
            conf = float(box.conf[0].item())
            if conf > 0.4:
                detected_classes.append({"class": cls_name, "confidence": round(conf, 2)})

        # Vérifier si des objets suspects sont détectés
        detected_names = {d["class"] for d in detected_classes}
        found_suspicious = detected_names & suspicious_classes
        is_suspicious = len(found_suspicious) > 0

        # Analyse heuristique supplémentaire :
        # Si l'image contient trop d'éléments non-liés au quiz
        is_suspicious = is_suspicious or len(detected_classes) > 8

        if is_suspicious and req.attemptId:
            record = {
                "type":      "SUSPICIOUS_SCREEN",
                "details":   f"YOLOv8 a détecté : {[d['class'] for d in detected_classes]}",
                "timestamp": datetime.now().isoformat(),
                "severity":  "HIGH",
                "source":    "yolov8",
            }
            incidents[req.attemptId].append(record)

        log.info(f"Screenshot analysé — suspicious:{is_suspicious} — détections:{detected_classes}")

        return {
            "analyzed":     True,
            "suspicious":   is_suspicious,
            "detections":   detected_classes,
            "foundSuspicious": list(found_suspicious),
        }

    except Exception as e:
        log.error(f"Erreur analyse screenshot : {e}")
        return {
            "analyzed": False,
            "suspicious": False,
            "error": str(e),
        }

# ── Résumé des incidents pour l'admin ────────────────────────────
@app.get("/api/anticheat/summary/{attempt_id}")
def get_summary(attempt_id: str):
    """Résumé de tous les incidents pour une tentative."""
    attempt_incidents = incidents.get(attempt_id, [])
    return {
        "attemptId":    attempt_id,
        "totalIncidents": len(attempt_incidents),
        "shouldTerminate": len(attempt_incidents) >= 2,
        "incidents":    attempt_incidents,
        "severity":     get_max_severity(attempt_incidents),
    }

@app.get("/api/anticheat/all")
def get_all():
    """Toutes les tentatives avec incidents (vue admin)."""
    return {
        "attempts": [
            {
                "attemptId": attempt_id,
                "incidentCount": len(evts),
                "lastIncident": evts[-1] if evts else None,
            }
            for attempt_id, evts in incidents.items()
        ]
    }

# ── Utilitaires ──────────────────────────────────────────────────

def get_severity(event_type: str) -> str:
    critical = {"CLIPBOARD_IMAGE", "SUSPICIOUS_PROCESS", "DEVTOOLS_OPEN"}
    high     = {"WINDOW_BLUR", "TAB_HIDDEN", "PRINT_ATTEMPT"}
    medium   = {"CONTEXT_MENU", "COPY_ATTEMPT"}
    if event_type in critical: return "CRITICAL"
    if event_type in high:     return "HIGH"
    if event_type in medium:   return "MEDIUM"
    return "LOW"

def get_max_severity(incidents_list: list) -> str:
    order = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1}
    if not incidents_list: return "NONE"
    return max((i.get("severity", "LOW") for i in incidents_list), key=lambda s: order.get(s, 0))


# ══ DÉMARRAGE ════════════════════════════════════════════════════
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8686)