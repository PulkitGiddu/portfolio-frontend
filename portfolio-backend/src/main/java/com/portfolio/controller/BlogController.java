package com.portfolio.controller;

import com.portfolio.model.Blog;
import com.portfolio.service.BlogService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class BlogController {

    private static final Logger log = LoggerFactory.getLogger(BlogController.class);
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping
    public ResponseEntity<List<Blog>> getAllPublishedBlogs() {
        return ResponseEntity.ok(blogService.getAllPublishedBlogs());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<Blog> getBlogBySlug(@PathVariable String slug) {
        return blogService.getPublishedBlogBySlug(slug)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<List<Blog>> getBlogsByTag(@PathVariable String tag) {
        return ResponseEntity.ok(blogService.getBlogsByTag(tag));
    }

    // Admin endpoints
    @PostMapping
    public ResponseEntity<Blog> createBlog(@Valid @RequestBody Blog blog) {
        return ResponseEntity.status(HttpStatus.CREATED).body(blogService.createBlog(blog));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @Valid @RequestBody Blog blog) {
        return ResponseEntity.ok(blogService.updateBlog(id, blog));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }
}
