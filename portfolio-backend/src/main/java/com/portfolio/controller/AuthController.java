package com.portfolio.controller;

import com.portfolio.dto.AuthStatusDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${app.cors.allowed-origins}", allowCredentials = "true")
public class AuthController {

    @Value("${app.admin.email}")
    private String adminEmail;

    @GetMapping("/status")
    public AuthStatusDTO getStatus(@AuthenticationPrincipal OAuth2User principal) {
        if (principal == null) {
            log.warn("Auth status check: Principal is NULL");
            return new AuthStatusDTO(false, false, null, null);
        }

        String email = principal.getAttribute("email");
        boolean isAdmin = email != null && email.equalsIgnoreCase(adminEmail);
        String name = principal.getAttribute("name");

        log.info("Auth status check: Email={}, AdminEmail={}, IsAdmin={}", email, adminEmail, isAdmin);

        return new AuthStatusDTO(true, isAdmin, name, email);
    }

}
