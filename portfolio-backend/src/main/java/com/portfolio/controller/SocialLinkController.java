package com.portfolio.controller;

import com.portfolio.model.SocialLink;
import com.portfolio.service.SocialLinkService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/social-links")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class SocialLinkController {

    private final SocialLinkService service;

    public SocialLinkController(SocialLinkService service) {
        this.service = service;
    }

    @GetMapping
    public List<SocialLink> getActiveLinks() {
        return service.getActiveLinks();
    }

    @PostMapping
    public ResponseEntity<SocialLink> createLink(@RequestBody SocialLink link) {
        return ResponseEntity.ok(service.createLink(link));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLink(@PathVariable Long id) {
        service.deleteLink(id);
        return ResponseEntity.noContent().build();
    }
}
