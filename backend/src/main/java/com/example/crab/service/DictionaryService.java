package com.example.crab.service;

import com.example.crab.transport.dictionary.TaskResponse;
import com.example.crab.transport.dictionary.DictionaryList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DictionaryService {
  private final TaskService taskService;

  public DictionaryService(TaskService taskService) {
    this.taskService = taskService;
  }

  public DictionaryList getDictionaries() {
    List<TaskResponse> taskTemplates = taskService.findAllTasks();
    return new DictionaryList(taskTemplates);
  }
}
