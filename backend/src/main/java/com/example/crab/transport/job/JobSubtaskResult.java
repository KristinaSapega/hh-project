package com.example.crab.transport.job;

import com.example.crab.entity.JobSubtaskState;
import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

public record JobSubtaskResult(
    @Schema(
        description = "Адрес стенда",
        example = "255.255.255.0"
    )
    String vm,
    @Schema(
        description = "Статус задачи",
        type = "string",
        example = "ok"
    )
    JobSubtaskState status,
    @Schema(
        description = "Имя подзадачи",
        example = "subtaskName",
        requiredMode = Schema.RequiredMode.NOT_REQUIRED
    )
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String errorMessage
    ) {
}
