package com.example.crab.transport.ansibleLog;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record AnsibleReport (
    @Schema(description = "Лист задач из playbook", example = """
        "tasks": [
        {
            "name": "Gathering Facts",
            "status": "ok"
        },
        {
            "name": "clone repository",
            "status": "ok"
        }
        ]
            """)
    List<AnsibleTask> tasks,
    @Schema(description = "Количество задач со статусом ok", example = "0")
    int okCount,
    @Schema(description = "Количество задач со статусом changed", example = "0")
    int changedCount,
    @Schema(description = "Количество задач со статусом unreachable", example = "0")
    int unreachableCount,
    @Schema(description = "Количество задач со статусом failed", example = "0")
    int failedCount,
    @Schema(description = "Количество задач со статусом skipped", example = "0")
    int skippedCount,
    @Schema(description = "Количество задач со статусом rescued", example = "0")
    int rescuedCount,
    @Schema(description = "Количество задач со статусом ignored", example = "0")
    int ignoredCount,
    @Schema(description = "Флаг об окончании выполнения джобы", example = "false")
    boolean finish
) {

}
