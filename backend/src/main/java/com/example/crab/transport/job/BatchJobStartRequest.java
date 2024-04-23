package com.example.crab.transport.job;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema
public record BatchJobStartRequest(
    @Schema(
        description = "Id стендов",
        type = "array",
        example = "[1, 2]"
    )
    List<Integer> stands,
    @Schema(
        description = "Запланированные задачи"
    )
    List<JobTaskRequest> tasks
) {

}
