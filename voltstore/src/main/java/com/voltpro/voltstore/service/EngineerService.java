package com.voltpro.voltstore.service;

import com.voltpro.voltstore.dto.EngineerResponse;
import com.voltpro.voltstore.model.Engineer;
import com.voltpro.voltstore.repository.EngineerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EngineerService {

    private final EngineerRepository engineerRepository;

    public EngineerService(EngineerRepository engineerRepository) {
        this.engineerRepository = engineerRepository;
    }

    public List<EngineerResponse> getAllEngineers() {
        return engineerRepository.findAll()
                .stream()
                .map(this::toEngineerResponse)
                .toList();
    }

    private EngineerResponse toEngineerResponse(Engineer engineer) {
        return new EngineerResponse(
                engineer.getId(),
                engineer.getName(),
                engineer.getRole(),
                engineer.getLocation()
        );
    }
}
