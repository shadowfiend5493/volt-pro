package com.voltpro.voltstore.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Email is required")
        @Email(message = "Email address must be a valid value")
        String email,

        @NotBlank(message = "Password is required")
        String password
) {
}
