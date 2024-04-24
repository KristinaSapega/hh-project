package com.example.crab.transport.dictionary;

import io.swagger.v3.oas.annotations.media.Schema;

public record Field(
    @Schema(description = "Тип вводимых данных", example = "input")
    String type,
    @Schema(description = "Наименование поля", example = "repo")
    String name,
    @Schema(description = "Placeholder", example = "repo url")
    String placeholder) {

}
