package com.voltpro.voltstore.service;

import com.voltpro.voltstore.dto.LoginRequest;
import com.voltpro.voltstore.dto.LoginResponse;
import com.voltpro.voltstore.dto.RegisterRequest;
import com.voltpro.voltstore.dto.UserResponse;
import com.voltpro.voltstore.model.AppUser;
import com.voltpro.voltstore.model.UserRole;
import com.voltpro.voltstore.repository.UserRepository;
import com.voltpro.voltstore.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService(
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            PasswordEncoder passwordEncoder,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password())
        );

        AppUser appUser = userRepository.findByEmail(normalizeEmail(loginRequest.email()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));

        return new LoginResponse(
                "Login successful",
                toUserResponse(appUser),
                jwtService.generateToken(authentication)
        );
    }

    public UserResponse register(RegisterRequest registerRequest) {
        String email = normalizeEmail(registerRequest.email());
        if (userRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "An account already exists for this email.");
        }

        AppUser appUser = new AppUser();
        appUser.setName(registerRequest.name().trim());
        appUser.setEmail(email);
        appUser.setMobileNumber(registerRequest.mobileNumber());
        appUser.setPassword(passwordEncoder.encode(registerRequest.password()));
        appUser.setEnabled(true);
        appUser.setRoles(new LinkedHashSet<>(Set.of(UserRole.USER)));

        return toUserResponse(userRepository.save(appUser));
    }

    public UserResponse getCurrentUser(String email) {
        AppUser appUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        return toUserResponse(appUser);
    }

    private UserResponse toUserResponse(AppUser appUser) {
        List<String> roles = appUser.getRoles()
                .stream()
                .map(Enum::name)
                .sorted()
                .toList();

        return new UserResponse(
                appUser.getUserId(),
                appUser.getName(),
                appUser.getEmail(),
                appUser.getMobileNumber(),
                roles
        );
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
