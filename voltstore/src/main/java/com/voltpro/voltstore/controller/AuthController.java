package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.dto.AuthMessageResponse;
import com.voltpro.voltstore.dto.LoginRequest;
import com.voltpro.voltstore.dto.LoginResponse;
import com.voltpro.voltstore.dto.RegisterRequest;
import com.voltpro.voltstore.dto.UserResponse;
import com.voltpro.voltstore.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.register(registerRequest));
    }

    @GetMapping("/status")
    public ResponseEntity<AuthMessageResponse> status() {
        return ResponseEntity.ok(new AuthMessageResponse("Auth API is available"));
    }
}
