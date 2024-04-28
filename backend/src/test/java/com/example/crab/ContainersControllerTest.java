package com.example.crab;

import com.example.crab.config.SecurityConfig;
import com.example.crab.controller.ContainerController;
import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.service.ContainerServiceImpl;
import com.example.crab.transport.container.ContainerDto;
import com.example.crab.transport.container.ContainerNameDto;
import com.example.crab.transport.container.PortDto;
import java.util.List;
import java.util.Optional;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


@WebMvcTest(controllers = ContainerController.class,
    excludeAutoConfiguration = SecurityConfig.class)
@AutoConfigureMockMvc
public class ContainersControllerTest {

  @MockBean
  private ContainerServiceImpl containerService;

  @Autowired
  private WebApplicationContext context;

  @Autowired
  private FilterChainProxy springSecurityFilterChain;

  @Autowired
  private MockMvc mockMvc;

  @Before
  public void setUp() {
    MockitoAnnotations.initMocks(this);
    this.mockMvc = MockMvcBuilders
        .webAppContextSetup(context)
        .addFilter(springSecurityFilterChain)
        .apply(springSecurity())
        .build();
  }

  @Test
  @WithMockUser
  public void testGetContainerByStandId() throws Exception{
    when(containerService.getContainers(1)).thenReturn(getContainers());
    mockMvc.perform(get("/api/stands/1/containers"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()").value(1))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser
  public void testGetContainerByIdByStandIdSuccess() throws Exception{
    when(containerService.getContainerById(1,"ab345df")).thenReturn(Optional.ofNullable(getContainers().get(0)));
    mockMvc.perform(get("/api/stands/1/containers/ab345df"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("jenkins"))
        .andExpect(jsonPath("$.state").value("running"))
        .andExpect(jsonPath("$.status").value("up 10 minutes"))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser
  public void testGetContainerByIdByStandIdNotFound() throws Exception{
    when(containerService.getContainerById(1,"ab345df")).thenReturn(Optional.ofNullable(getContainers().get(0)));
    mockMvc.perform(get("/api/stands/1/containers/ab345d"))
        .andExpect(status().isNotFound())
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser
  public void testGetLogByContainerIdSuccess() throws Exception{
    when(containerService.getLogByContainerId(1,"ab345df")).thenReturn("start process");
    mockMvc.perform(get("/api/stands/1/containers/ab345df/logs"))
        .andExpect(status().isOk())
        .andExpect(content().string("start process"))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser
  public void testGetLogByContainerIdNotFound() throws Exception{
    when(containerService.getLogByContainerId(1,"ab345d")).thenThrow(new ResourceNotFoundException());
    mockMvc.perform(get("/api/stands/1/containers/ab345d/logs"))
        .andExpect(status().isNotFound())
        .andDo(MockMvcResultHandlers.print());
  }


  private List<ContainerDto> getContainers() {
    ContainerDto container1 = new ContainerDto();
    container1.setId("ab345df");
    container1.setName(List.of(new ContainerNameDto("jenkins")));
    PortDto port1 = new PortDto();
    port1.setIp("0:0:0:0");
    port1.setPrivatePort(80);
    port1.setPublicPort(80);
    port1.setType("tcp");
    container1.setPorts(List.of(port1));
    container1.setState("running");
    container1.setStatus("up 10 minutes");
    return List.of(container1);
  }
}
