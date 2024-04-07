package com.example.crab.transport.job;


import io.swagger.v3.oas.annotations.media.Schema;

public record JobTaskRequest(
    @Schema(
        description = "Имя playbook",
        example = "deployServices"
    )
    String type,
    @Schema(
        description = "Параметры playbook (могут задаваться произвольными структурами)",
        type = "object",
        example = """
            {
                "services": [
                    {
                        "serviceRepo": "url/to/repo",
                        "branch": "branch"
                    }
                ]
            }
            """
    )
    Object parameters
) {
}
