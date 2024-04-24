package com.example.crab.transport.stand;

import io.swagger.v3.oas.annotations.media.Schema;

public record TakenByDto (
    @Schema(description = "Владелец стена", example = "user@test.ru")
    String takenBy)
{
}
