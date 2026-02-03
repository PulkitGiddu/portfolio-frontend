package com.portfolio.config;

import com.portfolio.model.Blog;
import com.portfolio.repository.BlogRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(BlogRepository blogRepository) {
        return args -> {
            if (blogRepository.count() == 0) {
                Blog sampleBlog = new Blog();
                sampleBlog.setTitle("Welcome to My Portfolio");
                sampleBlog.setSlug("welcome-to-my-portfolio");
                sampleBlog.setSummary("This is a sample blog post to demonstrate the blog functionality.");
                sampleBlog.setContent(
                        "<h2>Welcome!</h2><p>This is the first blog post on my new portfolio website. It was automatically generated to show how the blog section looks.</p><p>I will be sharing my thoughts, projects, and tutorials here. Stay tuned!</p>");
                sampleBlog.setCoverImageUrl(
                        "https://images.unsplash.com/photo-1499750310159-5b5f8ca473aa?q=80&w=2070&auto=format&fit=crop");
                sampleBlog.setTags("Welcome, Update");
                sampleBlog.setPublished(true);
                sampleBlog.setPublishedAt(LocalDateTime.now());

                blogRepository.save(sampleBlog);
                System.out.println("Sample blog post created successfully.");
            }
        };
    }
}
