package com.example.crab.service.job;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class JobLogFileResolver {
  private static final Path LOGS_DIR = Path.of("ansible", "logs");
  private static final DateTimeFormatter TIMESTAMP_FORMATTER = DateTimeFormatter.ofPattern("dd.MM.yyyy.HH.mm")
                                                                                .withZone(ZoneId.systemDefault());

  public JobLogFileResolver() {
    try {
      Files.createDirectories(LOGS_DIR);
    } catch (IOException e) {
      throw new RuntimeException("IOException on creating logs dir", e);
    }
  }

  public Path resolve(Job job) {
    return LOGS_DIR.resolve("%d-%s-%s-%s".formatted(
      job.id(),
      job.standAddress(), 
      job.taskType(), 
      TIMESTAMP_FORMATTER.format(job.createdAt())));
  }

}
