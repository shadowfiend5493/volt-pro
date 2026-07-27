package com.voltpro.voltstore.repository;

import com.voltpro.voltstore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
