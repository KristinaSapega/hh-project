package com.example.crab.exception.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

  public ResourceNotFoundException() {
    super();
  }

  public ResourceNotFoundException(Exception e) {
    super(e);
  }

  public ResourceNotFoundException(String message, Exception e) {
    super(message, e);
  }

}
