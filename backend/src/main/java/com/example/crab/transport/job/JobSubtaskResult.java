package com.example.crab.transport.job;

import com.example.crab.entity.JobSubtaskState;
import com.fasterxml.jackson.annotation.JsonInclude;

public record JobSubtaskResult(
    String vm,
    JobSubtaskState status,
    @JsonInclude(JsonInclude.Include.NON_NULL)
    String errorMessage
    ) {
}
