package com.example.crab.service;

import com.example.crab.entity.User;
import com.example.crab.persistence.UserRepository;
import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

  private UserRepository userRepository;

  public UserService (UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findByEmail(email)
        .map(this::buildSpringUser)
        .orElseThrow(() -> new NoSuchElementException("Not found user with 'email': " + email));
  }

  private UserDetails buildSpringUser(final User user) {
    return new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        List.of(new SimpleGrantedAuthority("USER"))
    );
  }
}
