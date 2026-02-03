-- Enable UUID extension if we want to use UUIDs, but Serial/BigSerial is fine for this scale
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_data BYTEA, -- Storing image directly in DB as requested
    image_content_type VARCHAR(50), -- e.g., 'image/jpeg'
    project_url VARCHAR(255),
    tags VARCHAR(255), -- Comma separated tags
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL, -- Markdown or HTML content
    cover_image_url VARCHAR(255), -- URL or we could store BYTEA too if preferred, but URL is standard for blogs
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    tags VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
    id BIGSERIAL PRIMARY KEY,
    platform_name VARCHAR(50) NOT NULL, -- e.g., 'GitHub', 'LinkedIn'
    url VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50), -- React Icon name e.g., 'FaGithub'
    is_active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id BIGSERIAL PRIMARY KEY,
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT,
    voice_memo_data BYTEA, -- Audio data
    voice_memo_content_type VARCHAR(50), -- e.g., 'audio/webm'
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_social_links_active ON social_links(is_active);
