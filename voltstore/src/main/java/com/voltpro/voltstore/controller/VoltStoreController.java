package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.model.VoltStore;
import com.voltpro.voltstore.service.VoltStoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/voltstore")
public class VoltStoreController {

    private final VoltStoreService voltStoreService;

    public VoltStoreController(VoltStoreService voltStoreService) {
        this.voltStoreService = voltStoreService;
    }

    @GetMapping
    public ResponseEntity<List<VoltStore>> getAllVoltStores() {
        return ResponseEntity.ok(voltStoreService.getAllVoltStores());
    }
}
