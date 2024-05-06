package com.example.crab.transport.dictionary;

import com.example.crab.entity.Task;
import com.example.crab.util.FileUtils;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Objects;

public record TaskResponse(
    @Schema(description = "id playbook", example = "12")
    Integer id,
    @Schema(description = "Название playbook", example = "deployService")
    String name,
    @Schema(description = "Описание playbook", example = "Клонирование ветки на стенд")
    String description,
    @Schema(description = "Json-схема для описания параметров playbook")
    Object paramsSchema

) {

  public static TaskResponse fromEntity(Task task)  {
    Object schema;
    try {
      schema = Objects.isNull(task.getParamsSchemaPath()) ? null :
          FileUtils.readJsonObjectFromPath(Path.of(task.getParamsSchemaPath()));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    return new TaskResponse(
        task.getId(),
        task.getName(),
        task.getDescription(),
        schema
    );
  }
}
