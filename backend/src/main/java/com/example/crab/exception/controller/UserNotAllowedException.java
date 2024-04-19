package com.example.crab.exception.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
public class UserNotAllowedException extends RuntimeException{
  public UserNotAllowedException() {
    super();
  }

  public UserNotAllowedException(Exception e) {
    super(e);
  }

  public UserNotAllowedException(String message, Exception e) {
    super(message, e);
  }
}
