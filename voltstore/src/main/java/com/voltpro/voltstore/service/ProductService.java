package com.voltpro.voltstore.service;

import com.voltpro.voltstore.dto.ProductResponse;
import com.voltpro.voltstore.model.Product;
import com.voltpro.voltstore.repository.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));

        return toProductResponse(product);
    }

    private ProductResponse toProductResponse(Product product) {
        return new ProductResponse(
                product.getProductId(),
                product.getName(),
                product.getCategory(),
                product.getDescription(),
                product.getImageUrl(),
                product.getPrice(),
                product.getStockQuantity()
        );
    }
}
