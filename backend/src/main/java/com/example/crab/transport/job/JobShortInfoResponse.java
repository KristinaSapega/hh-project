package com.example.crab.transport.job;


import io.swagger.v3.oas.annotations.media.Schema;

public record JobShortInfoResponse(
    @Schema(
        description = "Идентификатор ansible-задачи",
        example = "12"
    )
    Long jobId) {
}
