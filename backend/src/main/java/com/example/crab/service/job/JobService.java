package com.example.crab.service.job;

import com.example.crab.entity.Stand;
import com.example.crab.exception.controller.UserNotAllowedException;
import com.example.crab.persistence.JobRepository;
import com.example.crab.entity.Job;
import com.example.crab.persistence.StandRepository;
import com.example.crab.transport.job.JobDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.file.Files;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.service.StandsService;
import com.example.crab.transport.job.BatchJobStartRequest;

@Service
public class JobService {

  private final JobExecutor executor;
  private final JobLogFileResolver logFileResolver;
  private final StandsService standsService;
  private final JobRepository jobRepository;
  private final StandRepository standRepository;
  private final ObjectMapper objectMapper;



  public JobService(JobExecutor executor, JobLogFileResolver logFileResolver, StandsService standsService, JobRepository jobRepository,
      StandRepository standRepository
  ) {
    this.executor = executor;
    this.logFileResolver = logFileResolver;
    this.standsService = standsService;
    this.jobRepository = jobRepository;
    this.standRepository = standRepository;
    this.objectMapper = new ObjectMapper();
  }

  public void runJobs(BatchJobStartRequest request, String user) {
    List<Job> newJobs = request.stands().stream()
        .flatMap(stand -> request.tasks().stream()
            .map(task -> {
              if (!standsService.getStand(stand).takenBy().equals(user)) {
                throw new UserNotAllowedException();
              }
              Job job = new Job();
              Stand st = standRepository.findById(stand).orElseThrow(() -> new ResourceNotFoundException());
              job.setStand(st);
              job.setTaskName(task.name());
              job.setCreatedAt(Instant.now());
              job.setParameters(toJson(task.parameters()));
              jobRepository.save(job);
              return job;
            }))
        .toList();
    executor.runJobs(newJobs);
  }

  public String getJobLogs(int jobId, long offset) {
    Job job = jobRepository.findById(jobId).orElseThrow(() -> new ResourceNotFoundException());
    try {
      return Files.readAllLines(logFileResolver.resolve(job)).stream()
          .skip(offset)
          .collect(Collectors.joining("\n"));
    } catch (IndexOutOfBoundsException e) {
      throw new ResourceNotFoundException("No job with id = " + jobId, e);
    } catch (IOException e) {
      throw new RuntimeException("IOException on logs read", e);
  }
  }

  public List<JobDto> getStandJobs(int standId) {
    Stand stand = standRepository.findById(standId).orElseThrow(() -> new ResourceNotFoundException());
    return jobRepository.findByStand(stand).stream()
        .map(JobDto::fromEntity)
        .toList();
  }

  private String toJson(Object object) {
    String json = null;
    try {
      json = objectMapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      throw new RuntimeException(e);
    }
    return json;
  }
}
