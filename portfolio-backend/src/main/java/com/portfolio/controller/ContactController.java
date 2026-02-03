package com.portfolio.controller;

import com.portfolio.model.ContactMessage;
import com.portfolio.service.ContactService;
import com.portfolio.service.RateLimitingService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ContactController {

    private final ContactService contactService;
    private final RateLimitingService rateLimit;

    public ContactController(ContactService contactService, RateLimitingService rateLimit) {
        this.contactService = contactService;
        this.rateLimit = rateLimit;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> submitContactForm(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("message") String message,
            @RequestParam(value = "voiceMemo", required = false) MultipartFile voiceMemo,
            HttpServletRequest request) {
        // Rate Limiting
        String ip = request.getRemoteAddr();
        Bucket bucket = rateLimit.resolveBucket(ip);
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Too many requests");
        }

        try {
            ContactMessage contactMessage = new ContactMessage();
            contactMessage.setSenderName(name);
            contactMessage.setSenderEmail(email);
            contactMessage.setMessage(message);

            if (voiceMemo != null && !voiceMemo.isEmpty()) {
                contactMessage.setVoiceMemoData(voiceMemo.getBytes());
                contactMessage.setVoiceMemoContentType(voiceMemo.getContentType());
            }

            contactService.saveMessage(contactMessage);
            return ResponseEntity.ok("Message sent successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process attachment");
        }
    }
}
