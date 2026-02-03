package com.portfolio.service;

import com.portfolio.model.SocialLink;
import com.portfolio.repository.SocialLinkRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SocialLinkService {

    private final SocialLinkRepository repository;

    public SocialLinkService(SocialLinkRepository repository) {
        this.repository = repository;
    }

    @Cacheable("socialLinks")
    public List<SocialLink> getActiveLinks() {
        return repository.findAllByIsActiveTrueOrderByDisplayOrderAsc();
    }

    @Transactional
    @CacheEvict(value = "socialLinks", allEntries = true)
    public SocialLink createLink(SocialLink link) {
        return repository.save(link);
    }

    @Transactional
    @CacheEvict(value = "socialLinks", allEntries = true)
    public void deleteLink(Long id) {
        repository.deleteById(id);
    }
}
