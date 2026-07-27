package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.dto.ProductResponse;
import com.voltpro.voltstore.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "Products", description = "Product catalogue APIs")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "List products", description = "Returns all products available in the VoltPro catalogue.")
    @ApiResponse(responseCode = "200", description = "Products returned")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{productId}")
    @Operation(summary = "Get product", description = "Returns one product by id for the product detail page.")
    @ApiResponse(responseCode = "200", description = "Product returned")
    @ApiResponse(responseCode = "404", description = "Product not found")
    public ResponseEntity<ProductResponse> getProductById(
            @Parameter(description = "Product id", example = "1")
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(productService.getProductById(productId));
    }
}
