package com.example.crab.transport.job;

import java.util.List;

public record JobTaskInfo(
    String type,
    List<JobSubtaskInfo> subtasks
) {

}
