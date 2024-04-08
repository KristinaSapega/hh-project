package com.example.crab.transport.job;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record JobInfoResponse(
    @Schema(
        description = "Идентификатор ansible-задачи",
        example = "12"
    )
    Long jobId,
    @Schema(
        description = "Определяет, активна ли задача",
        example = "true"
    )
    Boolean executing,
    @Schema(
        description = "Список задач"
    )
    List<JobTaskInfo> tasks
) {
}
