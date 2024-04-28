package com.example.crab;

import com.example.crab.config.SecurityConfig;
import com.example.crab.controller.StandsController;
import com.example.crab.exception.controller.ResourceNotFoundException;
import com.example.crab.exception.controller.UserNotAllowedException;
import com.example.crab.service.StandsService;
import com.example.crab.transport.stand.StandDto;
import com.example.crab.transport.stand.StandListDto;
import java.util.List;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


@WebMvcTest(controllers = StandsController.class,
    excludeAutoConfiguration = SecurityConfig.class)
@AutoConfigureMockMvc
public class StandsControllerTest {

  @MockBean
  private StandsService standsService;

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
  @WithAnonymousUser
  public void testGetStandsUnauthorizedUser() throws Exception{
    mockMvc.perform(get("/api/stands"))
        .andExpect(status().isUnauthorized());
  }

  @Test
  @WithMockUser
  public void testGetAllStandsSuccess() throws Exception{
    when(standsService.getAllStands()).thenReturn(getStands());
    mockMvc.perform(get("/api/stands"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.size()").value(1))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser
  public void testGetStandsByIdSuccess() throws Exception{
    when(standsService.getStand(1)).thenReturn(getStands().stands().get(0));
    mockMvc.perform(get("/api/stands/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.host").value("176.123.165.242"))
        .andExpect(jsonPath("$.status").value("running"))
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser
  public void testGetStandsByIdExceptionNotFound() throws Exception{
    when(standsService.getStand(3)).thenThrow(new ResourceNotFoundException());
    mockMvc.perform(get("/api/stands/3"))
        .andExpect(status().is4xxClientError())
        .andDo(MockMvcResultHandlers.print());
  }

  @Test
  @WithMockUser("user1@mail.ru")
  public void testPatchStandSuccess() throws Exception{
    StandDto standUpdated = new StandDto(getStands().stands().get(0).id(),
        getStands().stands().get(0).host(),
        getStands().stands().get(0).status(),
        "user1@mail.ru");
    when(standsService.updateStandTakenBy(1,"user1@mail.ru","user1@mail.ru")).thenReturn(standUpdated);
    mockMvc.perform(patch("/api/stands/1")
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)
        .content("""
            {
                "takenBy": "user1@mail.ru"
            }
            """)
        .with(httpBasic("user1@mail.ru", "password")).with(csrf().asHeader()))
        .andExpect(status().isOk())
        .andDo(MockMvcResultHandlers.print());

    when(standsService.getStand(1)).thenReturn(standUpdated);
    mockMvc.perform(get("/api/stands/1"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.host").value("176.123.165.242"))
        .andExpect(jsonPath("$.status").value("running"))
        .andExpect(jsonPath("$.takenBy").value("user1@mail.ru"));
  }

  @Test
  @WithMockUser("user1@mail.ru")
  public void testPatchStandExceptionForbidden() throws Exception{
    when(standsService.updateStandTakenBy(1,"user2@mail.ru","user1@mail.ru")).thenThrow(new UserNotAllowedException());
    mockMvc.perform(patch("/api/stands/1")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .content("""
            {
                "takenBy": "user2@mail.ru"
            }
            """)
            .with(httpBasic("user1@mail.ru", "password")).with(csrf().asHeader()))
        .andExpect(status().isForbidden())
        .andDo(MockMvcResultHandlers.print());
  }

  private StandListDto getStands() {
    return new StandListDto(List.of(new StandDto(1,"176.123.165.242","running",null),
        new StandDto(2,"176.109.99.81","running",null)));
  }
}
