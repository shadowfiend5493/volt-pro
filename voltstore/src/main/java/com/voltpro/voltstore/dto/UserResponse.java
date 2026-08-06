package com.voltpro.voltstore.dto;

import java.util.List;

public record UserResponse(
        Long userId,
        String name,
        String email,
        String mobileNumber,
        List<String> roles
) {
}
