package com.example.crab.transport.job;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record JobTaskInfo(
    @Schema(
        description = "Название playbook",
        example = "deployServices"
    )
    String type,
    @Schema(
        description = "Список подзадач в playbook"
    )
    List<JobSubtaskInfo> subtasks
) {

}
