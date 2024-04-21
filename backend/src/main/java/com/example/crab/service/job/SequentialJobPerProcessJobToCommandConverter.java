package com.example.crab.service.job;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class SequentialJobPerProcessJobToCommandConverter implements JobToCommandConverter {
  
  private static final Path TASKS_DIR = Path.of("ansible", "playbook");
  private static final Path DEFAULT_SSH_KEY = Path.of("ansible", "kostyl-key");
  private Optional<Path> sshKeyFile;
  private Optional<String> sshUser;
  private final ObjectMapper objectMapper;
  private final JobLogFileResolver logResolver;

  @Autowired
  public SequentialJobPerProcessJobToCommandConverter(JobLogFileResolver logResolver) {
    this.objectMapper = new ObjectMapper();
    this.logResolver = logResolver;
    this.sshKeyFile = Optional.of(DEFAULT_SSH_KEY);
    this.sshUser = Optional.of("crab-stand");
  }

  public SequentialJobPerProcessJobToCommandConverter(JobLogFileResolver logResolver, Path sshKeyFile) {
    this.objectMapper = new ObjectMapper();
    this.logResolver = logResolver;
    this.sshKeyFile = Optional.of(sshKeyFile);
  }
  
  @Override
  public String toCommand(List<Job> jobs) {
    return jobs.stream()
      .map(this::toCommand)
      .collect(Collectors.joining("; "));
  }

  public String toCommand(Job job) {
    return "ansible-playbook %s%s--ssh-common-args \"-o StrictHostKeyChecking=no\" --inventory %s, %s %s> %s"
    .formatted(
      sshKeyFile.map(keyFile -> "--private-key %s ".formatted(keyFile.toAbsolutePath().toString()))
        .orElse(""),
      sshUser.map("--user %s "::formatted)
        .orElse(""),
      job.standAddress(),
      TASKS_DIR.resolve(job.taskType() + ".yml").toAbsolutePath().toString(),
      job.parameters()
        .map(parameters -> "--extra-vars='%s' ".formatted(toJsonUnchecked(parameters)))
        .orElse(""),
      logResolver.resolve(job).toAbsolutePath().toString());
  }

  private String toJsonUnchecked(Object object) {
    try {
      return objectMapper.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      throw new RuntimeException("cant convert job parameters to json");
    }
  }

  public void setSshKeyFile(Path sshKeyFile) {
    this.sshKeyFile = Optional.ofNullable(sshKeyFile);
  }

}
