package com.example.crab.controller.stands.transport;

import java.time.Instant;

public record StandDto(Long id, String host, String status, Instant lastUpdate) {
}
