package com.example.crab.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileUtils {
  private FileUtils(){}

  public static Object readJsonObjectFromPath(Path path) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();
    String fileContent = Files.readString(path, StandardCharsets.UTF_8);
    return objectMapper.readValue(fileContent, Object.class);
  }
}
