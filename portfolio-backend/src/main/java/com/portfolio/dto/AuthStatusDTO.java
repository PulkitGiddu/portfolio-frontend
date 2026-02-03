package com.portfolio.dto;

public class AuthStatusDTO {
    private boolean isAuthenticated;
    private boolean isAdmin;
    private String name;
    private String email;

    public AuthStatusDTO() {
    }

    public AuthStatusDTO(boolean isAuthenticated, boolean isAdmin, String name, String email) {
        this.isAuthenticated = isAuthenticated;
        this.isAdmin = isAdmin;
        this.name = name;
        this.email = email;
    }

    public boolean isAuthenticated() {
        return isAuthenticated;
    }

    public void setAuthenticated(boolean isAuthenticated) {
        this.isAuthenticated = isAuthenticated;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
