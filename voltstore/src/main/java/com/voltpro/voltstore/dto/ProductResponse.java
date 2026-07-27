package com.voltpro.voltstore.dto;

import java.math.BigDecimal;

public class ProductResponse {

    private Long productId;
    private String name;
    private String category;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private int stockQuantity;

    public ProductResponse(
            Long productId,
            String name,
            String category,
            String description,
            String imageUrl,
            BigDecimal price,
            int stockQuantity
    ) {
        this.productId = productId;
        this.name = name;
        this.category = category;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
        this.stockQuantity = stockQuantity;
    }

    public Long getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }
}
