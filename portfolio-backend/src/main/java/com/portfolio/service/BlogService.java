package com.portfolio.service;

import com.portfolio.model.Blog;
import com.portfolio.repository.BlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    private static final Logger log = LoggerFactory.getLogger(BlogService.class);
    private final BlogRepository blogRepository;

    public BlogService(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    public List<Blog> getAllPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByPublishedAtDesc();
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> getPublishedBlogBySlug(String slug) {
        return blogRepository.findBySlugAndPublishedTrue(slug);
    }

    public List<Blog> getBlogsByTag(String tag) {
        return blogRepository.findByTagsContainingIgnoreCase(tag);
    }

    @Transactional
    public Blog createBlog(Blog blog) {
        if (blog.getSlug() == null || blog.getSlug().isEmpty()) {
            blog.setSlug(generateSlug(blog.getTitle()));
        }
        if (blog.getSummary() == null || blog.getSummary().isEmpty()) {
            blog.setSummary(generateExcerpt(blog.getContent()));
        }
        return blogRepository.save(blog);
    }

    @Transactional
    public Blog updateBlog(Long id, Blog updatedBlog) {
        return blogRepository.findById(id)
                .map(blog -> {
                    blog.setTitle(updatedBlog.getTitle());
                    blog.setSlug(updatedBlog.getSlug());
                    blog.setContent(updatedBlog.getContent());
                    blog.setSummary(updatedBlog.getSummary());
                    blog.setCoverImageUrl(updatedBlog.getCoverImageUrl());
                    blog.setTags(updatedBlog.getTags());
                    blog.setPublished(updatedBlog.getPublished());
                    blog.setPublishedAt(updatedBlog.getPublishedAt());
                    return blogRepository.save(blog);
                })
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
    }

    @Transactional
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }

    private String generateSlug(String title) {
        return title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    private String generateExcerpt(String content) {
        if (content == null || content.isEmpty()) {
            return "";
        }
        String plainText = content.replaceAll("<[^>]*>", "");
        int maxLength = 200;
        if (plainText.length() <= maxLength) {
            return plainText;
        }
        return plainText.substring(0, maxLength) + "...";
    }
}
