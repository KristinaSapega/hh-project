package com.example.crab.transport.job;


public record JobTaskRequest(
    String type,
    Object parameters
) {
}
