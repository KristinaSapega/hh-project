package com.example.crab.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.crab.transport.job.JobDto;
import com.example.crab.service.job.JobService;
import com.example.crab.transport.job.BatchJobStartRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@SecurityRequirement(name = "basicAuth")
@Tag(
    name = "API для управления джобами"
)
public class JobController {

  private final JobService jobService;

  public JobController(JobService jobService) {
    this.jobService = jobService;
  }

  @Operation(
      summary = "Запуск джобы на стенде",
      description = "Запускает для каждой пары стенд-таск джобу"
  )
  @ApiResponse(
      responseCode = "201",
      description = "Джобы созданы"
  )
  @ApiResponse(responseCode = "400", description = "Ошибка во входных данных", content = @Content)
  @PostMapping("/api/jobs")
  @ResponseStatus(HttpStatus.CREATED)
  public void runJobs(@RequestBody BatchJobStartRequest request, @AuthenticationPrincipal UserDetails userDetails) {
    jobService.runJobs(request, userDetails.getUsername());
  }

  @Operation(
      summary = "Получение логов джоба",
      description = "Логи выполнения джоба текстом"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Запущенная джоба найдена",
      content = {@Content(mediaType = "text/plain")}
  )
  @ApiResponse(responseCode = "404", description = "Джоба не найдена", content = @Content)
  @ApiResponse(responseCode = "400", description = "Некорректный jobId или offset", content = @Content)
  @GetMapping("/api/jobs/{jobId}/logs/raw")
  public String getJobLogs(@PathVariable int jobId, 
                           @Parameter(
                             name = "offset", 
                             description  = "Пропустить первые offset строк", 
                             required = false) 
                           @RequestParam(required = false, defaultValue = "0") long offset) {

    return jobService.getJobLogs(jobId, offset);
  }

  @Operation(
      summary = "Получение джобов",
      description = "Список джобов ранее запущенных на стенде"
  )
  @ApiResponse(
      responseCode = "200",
      description = "Стенд найден",
      content = {@Content(mediaType = "application/json")}
  )
  @ApiResponse(responseCode = "404", description = "Стенд не найден", content = @Content)
  @ApiResponse(responseCode = "400", description = "Некорректный standId", content = @Content)
  @GetMapping("/api/jobs")
  public List<JobDto> getJobs(@Parameter(
                            name = "standId", 
                            description  = "Айди стенда", 
                            required = true) 
                           @RequestParam(required = true) int standId) {

    return jobService.getStandJobs(standId);
  }


}
