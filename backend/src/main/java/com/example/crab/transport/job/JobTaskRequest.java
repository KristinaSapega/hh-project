package com.example.crab.transport.job;


import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

public record JobTaskRequest(
    @Schema(
        description = "Имя таска",
        example = "deployServices"
    )
    String name,
    @Schema(
        description = "Параметры таска (могут задаваться произвольными структурами)",
        type = "object",
        example = """
            {
              "services": [
                {
                  "repo": "private-repo-example",
                  "repoOwner": "ministr-kaifa",
                  "branch": "main"
                }
              ]
            }
            """
    )
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Object parameters
) {
}
