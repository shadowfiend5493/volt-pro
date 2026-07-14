package com.voltpro.voltstore.repository;

import com.voltpro.voltstore.model.Engineer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EngineerRepository extends JpaRepository<Engineer, Long> {
}
