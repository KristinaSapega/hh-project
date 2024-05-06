package com.example.crab.transport.job;

import com.example.crab.entity.Job;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.Instant;
import java.util.Optional;

public record JobDto(
    @Schema(description = "id job", example = "12")
    long id,
    @Schema(description = "Адрес стенда", example = "176.123.165.242")
    String standAddress,
    @Schema(description = "Название запущенного playbook", example = "deployService")
    String taskType,
    @Schema(description = "Время создания job", example = "2024-05-05 14:49:07.295490")
    Instant createdAt,
    @Schema(description = "Параметры, с которыми был запущен playbook", example = """
        {
          "service":
          {
            "repo":"private-repo-example",
            "repoOwner":"ministr-kaifa",
            "branch":"other-branch"
          }
        }
        """)
    String parameters) {
  public static JobDto fromEntity(Job job) {
    return new JobDto(job.getId(), job.getStand().getHost(), job.getTaskName(), job.getCreatedAt(), job.getParameters());
  }
}
