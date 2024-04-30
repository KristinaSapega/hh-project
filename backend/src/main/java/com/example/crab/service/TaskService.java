package com.example.crab.service;

import com.example.crab.persistence.TaskRepository;
import com.example.crab.transport.dictionary.TaskResponse;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
  private final TaskRepository taskRepository;

  public TaskService(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  public List<TaskResponse> findAllTasks(){
    return taskRepository.findAll().stream()
        .map(TaskResponse::fromEntity)
        .toList();
  }
}
