package com.example.crab.transport.job;

import java.util.List;

public record JobInfoRequest(
    List<String> stands,
    List<JobTaskRequest> tasks
) {

}
