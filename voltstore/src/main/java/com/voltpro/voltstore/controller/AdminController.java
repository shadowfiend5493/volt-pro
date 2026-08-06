package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.dto.AuthMessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @GetMapping("/overview")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthMessageResponse> overview() {
        return ResponseEntity.ok(new AuthMessageResponse("Admin access verified"));
    }
}
