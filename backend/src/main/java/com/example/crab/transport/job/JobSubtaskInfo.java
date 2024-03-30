package com.example.crab.transport.job;

import java.util.List;

public record JobSubtaskInfo(
    String name,
    List<JobSubtaskResult> results
) {
}
