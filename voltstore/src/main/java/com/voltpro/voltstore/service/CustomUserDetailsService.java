package com.voltpro.voltstore.service;

import com.voltpro.voltstore.model.AppUser;
import com.voltpro.voltstore.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String[] roles = appUser.getRoles()
                .stream()
                .map(Enum::name)
                .toArray(String[]::new);

        return User.builder()
                .username(appUser.getEmail())
                .password(appUser.getPassword())
                .disabled(!appUser.isEnabled())
                .roles(roles)
                .build();
    }
}
