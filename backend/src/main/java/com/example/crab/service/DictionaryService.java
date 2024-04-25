package com.example.crab.service;

import com.example.crab.transport.dictionary.Task;
import com.example.crab.transport.dictionary.DictionaryList;
import com.example.crab.transport.dictionary.Field;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class DictionaryService {
  public DictionaryList getDictionaries() {
    Task task = new Task(1, "DeployService", "Клонирование ветки на стенд",
        List.of(
            new Field("input","repo","name repo"),
            new Field("input","repoOwner","repo owner"),
            new Field("input","branch","repo branch")
        ));
    return new DictionaryList(List.of(task));
  }
}
