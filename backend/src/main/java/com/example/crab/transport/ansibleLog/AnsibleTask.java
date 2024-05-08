package com.example.crab.transport.ansibleLog;

import io.swagger.v3.oas.annotations.media.Schema;

public record AnsibleTask (
    @Schema(description = "Имя задачи из playbook", example = "Gathering Facts")
    String name,
    @Schema(description = "Статус задачи из playbook", example = "ok")
    String status) {

}
