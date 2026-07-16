package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.dto.EngineerResponse;
import com.voltpro.voltstore.service.EngineerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/engineers")
public class EngineerController {

    private final EngineerService engineerService;

    public EngineerController(EngineerService engineerService) {
        this.engineerService = engineerService;
    }

    @GetMapping
    public ResponseEntity<List<EngineerResponse>> getAllEngineers() {
        
        
        return ResponseEntity.ok(engineerService.getAllEngineers());
    }
}
