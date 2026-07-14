package com.voltpro.voltstore.dto;

public class EngineerResponse {

    private Long id;
    private String name;
    private String role;
    private String location;

    public EngineerResponse(Long id, String name, String role, String location) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.location = location;
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
}
