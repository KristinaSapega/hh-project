package com.example.crab.service.job;

import java.time.Instant;
import java.util.Optional;

public record Job(long id, String standAddress, String taskType, Instant createdAt, Optional<Object> parameters) {

}
