package com.voltpro.voltstore.dto;

public record LoginResponse(
        String message,
        UserResponse user,
        String jwtToken
) {
}
