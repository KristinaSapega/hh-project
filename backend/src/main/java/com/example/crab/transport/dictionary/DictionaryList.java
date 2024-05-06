package com.example.crab.transport.dictionary;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

public record DictionaryList (
    @Schema(description = "Лист доступных playbooks")
    List<TaskResponse> taskTemplates) {
}
