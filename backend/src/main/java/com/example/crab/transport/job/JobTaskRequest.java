package com.example.crab.transport.job;


import io.swagger.v3.oas.annotations.media.Schema;

public record JobTaskRequest(
    @Schema(
        description = "Имя таска",
        example = "deployService"
    )
    String type,
    @Schema(
        description = "Параметры таска (могут задаваться произвольными структурами)",
        type = "object",
        example = """
            {
              "service" : {
                "repo" : "private-repo-example",
                "repoOwner" : "ministr-kaifa",
                "branch" : "main"
              }
            }
            """
    )
    Object parameters
) {
}
