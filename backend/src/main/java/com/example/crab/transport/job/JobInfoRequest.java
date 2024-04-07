package com.example.crab.transport.job;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@Schema
public record JobInfoRequest(
    @Schema(
        description = "Адреса стендов",
        type = "array",
        example = "[\"255.255.255.0\", \"192.168.50.1\"]"
    )
    List<String> stands,
    @Schema(
        description = "Запланированные задачи"
    )
    List<JobTaskRequest> tasks
) {

}
