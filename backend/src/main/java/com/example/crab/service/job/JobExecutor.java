package com.example.crab.service.job;

import com.example.crab.entity.Job;
import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class JobExecutor {

  private static final Logger LOGGER = LoggerFactory.getLogger(JobExecutor.class);
  private static final List<String> SHELL_COMMAND = List.of("/bin/sh", "-c");
  
  private final JobToCommandConverter commandConverter;

  public JobExecutor(JobToCommandConverter commandConverter) {
    this.commandConverter = commandConverter;
  }

  public Process runJobs(List<Job> jobs) {
    try {
      var commands =  Stream.concat(
        SHELL_COMMAND.stream(), 
        List.of(commandConverter.toCommand(jobs)).stream())
        .toList();
      LOGGER.info("executing: " + commands);
      return new ProcessBuilder(
        Stream.concat(
          SHELL_COMMAND.stream(),
          List.of(commandConverter.toCommand(jobs)).stream())
        .toList()).start();
    } catch (IOException e) {
      System.out.println(e.getMessage());
      throw new RuntimeException("IOException on starting jobs process");
    }
  }

}
