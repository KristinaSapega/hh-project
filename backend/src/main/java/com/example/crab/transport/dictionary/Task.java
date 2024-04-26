package com.example.crab.transport.dictionary;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record Task(
    @Schema(description = "id playbook", example = "12")
    Integer id,
    @Schema(description = "Название playbook", example = "DeployService")
    String type,
    @Schema(description = "Описание playbook", example = "Клонирование ветки на стенд")
    String description,
    @Schema(description = "Описание полей")
    List<Field> fields) {
}
