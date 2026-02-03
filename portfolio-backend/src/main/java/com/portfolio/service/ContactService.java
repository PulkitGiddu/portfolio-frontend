package com.portfolio.service;

import com.portfolio.model.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactMessageRepository repository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository repository, EmailService emailService) {
        this.repository = repository;
        this.emailService = emailService;
    }

    @Transactional
    public ContactMessage saveMessage(ContactMessage message) {
        ContactMessage saved = repository.save(message);

        // Send email asynchronously
        emailService.sendContactNotification(
                saved.getSenderName(),
                saved.getSenderEmail(),
                saved.getMessage(),
                saved.getVoiceMemoData(),
                saved.getVoiceMemoContentType());

        return saved;
    }
}
