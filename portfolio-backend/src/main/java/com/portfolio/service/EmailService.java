package com.portfolio.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender mailSender;

    @Value("${app.contact.email}")
    private String contactEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Send contact form notification email
     */
    @Async
    public void sendContactNotification(String name, String email, String message, byte[] voiceMemo,
            String contentType) {
        try {
            if (voiceMemo != null && voiceMemo.length > 0) {
                sendMimeMessage(name, email, message, voiceMemo, contentType);
            } else {
                sendSimpleMessage(name, email, message);
            }
            log.info("Contact notification email sent successfully to: {}", contactEmail);
        } catch (Exception e) {
            log.error("Failed to send contact notification email", e);
            // Don't throw exception for async methods as it's lost usually, but logging is
            // vital
        }
    }

    private void sendSimpleMessage(String name, String email, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(contactEmail);
        mailMessage.setSubject("New Contact Form Submission from " + name);
        mailMessage.setText(buildEmailBody(name, email, message));
        mailMessage.setReplyTo(email);
        mailSender.send(mailMessage);
    }

    private void sendMimeMessage(String name, String email, String message, byte[] voiceMemo, String contentType)
            throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(contactEmail);
        helper.setSubject("New Contact Form Submission from " + name + " (Voice Memo Attached)");
        helper.setText(buildEmailBody(name, email, message));
        helper.setReplyTo(email);

        String ext = "audio"; // default
        if (contentType != null) {
            if (contentType.contains("webm"))
                ext = "webm";
            else if (contentType.contains("mp4"))
                ext = "mp4";
            else if (contentType.contains("ogg"))
                ext = "ogg";
            else if (contentType.contains("wav"))
                ext = "wav";
        }

        helper.addAttachment("voice-memo." + ext, new ByteArrayResource(voiceMemo));

        mailSender.send(mimeMessage);
    }

    private String buildEmailBody(String name, String email, String message) {
        return String.format("""
                You have received a new message from your portfolio website!

                From: %s
                Email: %s

                Message:
                %s

                ---
                This email was sent from your portfolio contact form.
                Reply directly to this email to respond to %s.
                """, name, email, message, name);
    }
}
