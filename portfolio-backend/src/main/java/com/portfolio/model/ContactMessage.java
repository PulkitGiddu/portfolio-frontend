package com.portfolio.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_name", nullable = false)
    private String senderName;

    @Column(name = "sender_email", nullable = false)
    private String senderEmail;

    private String phone;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "voice_memo_data")
    private byte[] voiceMemoData;

    @Column(name = "voice_memo_content_type")
    private String voiceMemoContentType;

    @CreationTimestamp
    @Column(name = "submitted_at", updatable = false)
    private LocalDateTime submittedAt;

    @Column(name = "is_read")
    private Boolean isRead = false;

    public ContactMessage() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderEmail() {
        return senderEmail;
    }

    public void setSenderEmail(String senderEmail) {
        this.senderEmail = senderEmail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public byte[] getVoiceMemoData() {
        return voiceMemoData;
    }

    public void setVoiceMemoData(byte[] voiceMemoData) {
        this.voiceMemoData = voiceMemoData;
    }

    public String getVoiceMemoContentType() {
        return voiceMemoContentType;
    }

    public void setVoiceMemoContentType(String voiceMemoContentType) {
        this.voiceMemoContentType = voiceMemoContentType;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public void setSubmittedAt(LocalDateTime submittedAt) {
        this.submittedAt = submittedAt;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
}
