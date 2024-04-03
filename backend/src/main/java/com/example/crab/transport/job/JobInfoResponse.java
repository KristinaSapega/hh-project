package com.example.crab.transport.job;

import java.util.List;

public record JobInfoResponse(
    Long jobId,
    Boolean executing,
    List<JobTaskInfo> tasks
) {
}
