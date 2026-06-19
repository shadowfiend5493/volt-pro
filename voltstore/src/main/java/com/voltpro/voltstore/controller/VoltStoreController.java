package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.model.VoltStore;
import com.voltpro.voltstore.service.VoltStoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/voltstore")
@RequiredArgsConstructor
@Slf4j
public class VoltStoreController {

    private final VoltStoreService voltStoreService;

    @GetMapping("/")
    public ResponseEntity<List<VoltStore>> getAllVoltStores() {
        return ResponseEntity.ok(voltStoreService.getAllVoltStores());
    }

    @GetMapping("/hello-world")
    public String helloWorld() {
        return "Hello World";
    }

    


}
