import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-activity-item",
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="activity-item">
            <div class="activity-icon">{{ icon }}</div>

            <div class="activity-content">
                <div class="activity-title">{{ title }}</div>
                <div class="activity-subtitle">{{ subtitle }}</div>
            </div>

            <div class="activity-time">{{ time }}</div>
        </div>
    `,
    styles: [
        `
            .activity-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 0;
                border-bottom: 1px solid #e5e7eb;
            }

            .activity-item:last-child {
                border-bottom: none;
            }

            .activity-icon {
                width: 38px;
                height: 38px;
                border-radius: 12px;
                background: #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                flex-shrink: 0;
            }

            .activity-content {
                flex: 1;
                min-width: 0;
            }

            .activity-title {
                font-size: 14px;
                font-weight: 700;
                color: #0f172a;
            }

            .activity-subtitle {
                font-size: 13px;
                color: #64748b;
                margin-top: 2px;
            }

            .activity-time {
                font-size: 12px;
                color: #94a3b8;
                white-space: nowrap;
            }
        `,
    ],
})
export class ActivityItemComponent {
    @Input() icon = "";
    @Input() title = "";
    @Input() subtitle = "";
    @Input() time = "";
}