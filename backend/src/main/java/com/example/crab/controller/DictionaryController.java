package com.example.crab.controller;

import com.example.crab.service.DictionaryService;
import com.example.crab.transport.dictionary.DictionaryList;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для Получения информации о доступных playbook"
)
public class DictionaryController {
  private final DictionaryService dictionaryService;

  public DictionaryController(DictionaryService dictionaryService) {
    this.dictionaryService = dictionaryService;
  }

  @Operation(
      summary = "Получение информации о playbooks",
      description = "Выдается информация по необходимым полям в playbook"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Информация о playbooks найдена",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = DictionaryList.class))}
  )
  @GetMapping("api/dictionaries")
  public DictionaryList getDictionaries() {
    return dictionaryService.getDictionaries();
  }
}
