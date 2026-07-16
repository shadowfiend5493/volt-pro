package com.voltpro.voltstore.dto;

public class EngineerResponse {

    private Long id;
    private String name;
    private String role;
    private String location;
    private String photoUrl;
    private double rating;

    public EngineerResponse(Long id, String name, String role, String location, String photoUrl, double rating) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.location = location;
        this.photoUrl = photoUrl;
        this.rating = rating;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getLocation() {
        return location;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public double getRating() {
        return rating;
    }
}
