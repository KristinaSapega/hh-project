package com.example.crab.controller;

import com.example.crab.transport.job.JobInfoRequest;
import com.example.crab.transport.job.JobInfoResponse;
import com.example.crab.transport.job.JobShortInfoResponse;
import com.example.crab.service.AnsibleJobService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnsibleJobController {

  private final AnsibleJobService jobService;

  public AnsibleJobController(AnsibleJobService jobService) {
    this.jobService = jobService;
  }

  @Operation(
      summary = "Запуск ansible job на стенде",
      description = "Запсускает указанный playbook"
  )
  @ApiResponse(
      responseCode = "201",
      description = "Задача была поставлена на выполенение"
  )
  @PostMapping("/api/jobs/queue")
  public ResponseEntity<JobShortInfoResponse> runJob(@RequestBody JobInfoRequest request){
    JobShortInfoResponse response = jobService.runJob(request);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }


  @Operation(
      summary = "Получение информации о выполняемой job-е",
      description = "Выдается статус по каждой задаче в playbook"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Успешно"
  )
  @GetMapping("/api/jobs/queue/{jobId}")
  public ResponseEntity<JobInfoResponse> getJobInfo(@PathVariable Long jobId){
    JobInfoResponse response = jobService.getJob(jobId);
    return ResponseEntity.ok(response);
  }

}
