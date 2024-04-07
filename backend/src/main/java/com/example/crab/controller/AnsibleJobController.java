package com.example.crab.controller;

import com.example.crab.transport.job.JobInfoRequest;
import com.example.crab.transport.job.JobInfoResponse;
import com.example.crab.transport.job.JobShortInfoResponse;
import com.example.crab.service.AnsibleJobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для управления Ansible-задачами"
)
public class AnsibleJobController {

  private final AnsibleJobService jobService;

  public AnsibleJobController(AnsibleJobService jobService) {
    this.jobService = jobService;
  }

  @Operation(
      summary = "Запуск ansible-задач на стенде",
      description = "Запускает указанный в теле playbook на стенде"
  )
  @ApiResponse(
      responseCode = "201",
      description = "Задача была поставлена на выполнение",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JobShortInfoResponse.class))}
  )
  @ApiResponse(responseCode = "400", description = "Ошибка во входных данных", content = @Content)
  @PostMapping("/api/jobs/queue")
  public ResponseEntity<JobShortInfoResponse> runJob(@RequestBody JobInfoRequest request) {
    JobShortInfoResponse response = jobService.runJob(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  @Operation(
      summary = "Получение информации о выполняемых задачах",
      description = "Выдается статус по каждой задаче в playbook"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Запущенная задача найдена",
      content = {@Content(mediaType = "application/json", schema = @Schema(implementation = JobInfoResponse.class))}
  )
  @ApiResponse(responseCode = "404", description = "Задача не найдена", content = @Content)
  @ApiResponse(responseCode = "400", description = "Некорректный jobId", content = @Content)
  @GetMapping("/api/jobs/queue/{jobId}")
  public ResponseEntity<JobInfoResponse> getJobInfo(@PathVariable Long jobId) {
    JobInfoResponse response = jobService.getJob(jobId);
    return ResponseEntity.ok(response);
  }


}
