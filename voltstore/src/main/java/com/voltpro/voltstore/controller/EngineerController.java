package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.dto.EngineerResponse;
import com.voltpro.voltstore.service.EngineerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/engineers")
@Tag(name = "Engineers", description = "Engineer directory APIs")
public class EngineerController {

    private final EngineerService engineerService;

    public EngineerController(EngineerService engineerService) {
        this.engineerService = engineerService;
    }

    @GetMapping
    @Operation(summary = "List engineers", description = "Returns all engineers available in the VoltPro network.")
    @ApiResponse(responseCode = "200", description = "Engineers returned")
    public ResponseEntity<List<EngineerResponse>> getAllEngineers() {
        return ResponseEntity.ok(engineerService.getAllEngineers());
    }
}
