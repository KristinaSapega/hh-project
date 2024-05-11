package com.example.crab.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для Получения информации о правильности данных пользователя"
)
public class LoginController {
  @Operation(
      summary = "Получение информации о существовании пользователя",
      description = "Возвращение статуса доступа к приложению"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Пользователь найден, вход в приложение возможен"
  )
  @ApiResponse(responseCode = "401", description = "Нет такого пользователя", content = @Content)
  @GetMapping("/api/login")
  public void getLogin() {
  }
}
