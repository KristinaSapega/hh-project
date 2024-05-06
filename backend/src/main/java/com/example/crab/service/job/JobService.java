package com.example.crab.service.job;

import java.io.IOException;
import java.nio.file.Files;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.stereotype.Service;

import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.service.StandsService;
import com.example.crab.transport.job.BatchJobStartRequest;

@Service
public class JobService {

  private final JobExecutor executor;
  private final JobLogFileResolver logFileResolver;
  private final StandsService standsService;

  private final List<Job> jobs;

  public JobService(JobExecutor executor, JobLogFileResolver logFileResolver, StandsService standsService) {
    this.executor = executor;
    this.logFileResolver = logFileResolver;
    this.standsService = standsService;
    jobs = new ArrayList<>();
  }

  public void runJobs(BatchJobStartRequest request) {
    var newJobs = IntStream.range(0, request.stands().size() * request.tasks().size())
      .mapToObj(Integer::valueOf)
      .flatMap(standIdIndex -> request.tasks().stream()
        .map(task -> 
          new Job(
            jobs.size() + standIdIndex,
            standsService.getStand(request.stands().get(standIdIndex)).host(),
            task.name(),
            Instant.now(),
            Optional.of(task.parameters()))))
      .toList();
    executor.runJobs(newJobs);
    jobs.addAll(newJobs);
  }

  public String getJobLogs(int jobId, long offset) {
    try {
      return Files.readAllLines(logFileResolver.resolve(jobs.get(jobId))).stream()
        .skip(offset)
        .collect(Collectors.joining("\n"));
    } catch (IndexOutOfBoundsException e) {
      throw new ResourceNotFoundException("No job with id = " + jobId, e);
    } catch (IOException e) {
      throw new RuntimeException("IOException on logs read", e);
    }
  }

  public List<Job> getStandJobs(int standId) {
    var standAddress = standsService.getStand(standId).host();
    return jobs.stream()
      .filter(job -> job.standAddress().equals(standAddress))
      .toList();
  }
  
}
