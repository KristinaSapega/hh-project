package com.example.crab.transport.container;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;
import io.swagger.v3.oas.annotations.media.Schema;

public class PortDto {
  private String ip;
  private Integer privatePort;
  private Integer publicPort;
  private String type;

  @JsonGetter("ip")
  @Schema(
      description = "Ip-адрес",
      example = "0.0.0.0"
  )
  public String getIp() {
    return ip;
  }

  @JsonSetter("IP")
  public void setIp(String ip) {
    this.ip = ip;
  }

  @JsonGetter("privatePort")
  @Schema(
      description = "Приватный порт",
      example = "2222"
  )
  public Integer getPrivatePort() {
    return privatePort;
  }

  @JsonSetter("PrivatePort")
  public void setPrivatePort(Integer privatePort) {
    this.privatePort = privatePort;
  }

  @JsonGetter("publicPort")
  @Schema(
      description = "Публичный порт",
      example = "3333"
  )
  public Integer getPublicPort() {
    return publicPort;
  }

  @JsonSetter("PublicPort")
  public void setPublicPort(Integer publicPort) {
    this.publicPort = publicPort;
  }

  @JsonGetter("type")
  @Schema(
      description = "Тип порта",
      example = "tcp"
  )
  public String getType() {
    return type;
  }

  @JsonSetter("Type")
  public void setType(String type) {
    this.type = type;
  }
}
