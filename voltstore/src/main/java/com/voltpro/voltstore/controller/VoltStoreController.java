package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.model.VoltStore;
import com.voltpro.voltstore.service.VoltStoreService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/voltstore")
@Tag(name = "VoltStore", description = "VoltPro store APIs")
public class VoltStoreController {

    private final VoltStoreService voltStoreService;

    public VoltStoreController(VoltStoreService voltStoreService) {
        this.voltStoreService = voltStoreService;
    }

    @GetMapping
    @Operation(summary = "List store records", description = "Returns all VoltStore records.")
    @ApiResponse(responseCode = "200", description = "Store records returned")
    public ResponseEntity<List<VoltStore>> getAllVoltStores() {
        return ResponseEntity.ok(voltStoreService.getAllVoltStores());
    }
}
