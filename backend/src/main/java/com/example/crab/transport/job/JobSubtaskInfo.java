package com.example.crab.transport.job;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record JobSubtaskInfo(
    @Schema(
        description = "Имя подзадачи",
        example = "subtaskName"
    )
    String name,
    @Schema(
        description = "Результаты выполнения подзадач"
    )
    List<JobSubtaskResult> results
) {
}
