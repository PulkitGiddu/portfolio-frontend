# Portfolio Backend - Spring Boot API

Backend API for the interactive portfolio website, providing blog management and contact form functionality.

## 🛠️ Tech Stack

- **Spring Boot 3.2.1** - Java framework
- **Spring Data JPA** - Database ORM
- **PostgreSQL** (Neon) - Cloud database
- **Spring Mail** - Email notifications
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management

## 📋 Features

### Blog API
- Create, read, update, delete blog posts
- Automatic slug generation from titles
- Automatic excerpt generation from content
- Reading time calculation
- Tag-based filtering
- Published/unpublished status

### Contact API
- Contact form submission
- Email notifications
- "Can We Talk?" quick notification
- Contact request storage in database

## 🚀 Setup Instructions

### 1. Database Setup (Neon PostgreSQL)

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy your connection string
4. Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://your-neon-host.neon.tech/portfolio?sslmode=require
spring.datasource.username=your-username
spring.datasource.password=your-password
```

### 2. Email Configuration (Gmail)

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Update `application.properties`:

```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-16-digit-app-password
app.contact.email=your-email@gmail.com
```

### 3. Build and Run

```bash
# Navigate to backend directory
cd portfolio-backend

# Build the project
./mvnw clean package

# Run the application
./mvnw spring-boot:run
```

The API will start on `http://localhost:8081`

## 📡 API Endpoints

### Blog Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all published blogs |
| GET | `/api/blogs/{slug}` | Get blog by slug |
| GET | `/api/blogs/tag/{tag}` | Get blogs by tag |
| POST | `/api/blogs` | Create new blog (admin) |
| PUT | `/api/blogs/{id}` | Update blog (admin) |
| DELETE | `/api/blogs/{id}` | Delete blog (admin) |

### Contact Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/contact/quick-talk` | Quick talk notification |

## 📝 Sample Blog Creation

```bash
curl -X POST http://localhost:8081/api/blogs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Spring Boot",
    "content": "Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications...",
    "tags": "Spring Boot,Java,Backend",
    "coverImage": "https://example.com/image.jpg",
    "published": true
  }'
```

## 🔒 Security Notes

> [!WARNING]
> **Current Implementation**: The blog creation/update/delete endpoints are currently **unprotected**. 

For production, you should add authentication:
1. Add Spring Security dependency
2. Implement JWT authentication
3. Protect admin endpoints with `@PreAuthorize("hasRole('ADMIN')")`

## 🌐 CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5174` (Vite dev server)
- `http://localhost:3000` (alternative dev server)

Update `app.cors.allowed-origins` in `application.properties` for production domains.

## 📦 Database Schema

### Blogs Table
```sql
CREATE TABLE blogs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image VARCHAR(500),
    tags VARCHAR(255),
    published BOOLEAN DEFAULT false,
    read_time INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Contact Requests Table
```sql
CREATE TABLE contact_requests (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing the API

### Test Blog Endpoint
```bash
curl http://localhost:8081/api/blogs
```

### Test Contact Form
```bash
curl -X POST http://localhost:8081/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello! I would like to discuss a project."
  }'
```

## 🚀 Deployment

### Railway Deployment

1. Create account on [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
   - `SPRING_MAIL_USERNAME`
   - `SPRING_MAIL_PASSWORD`
   - `APP_CONTACT_EMAIL`
   - `APP_CORS_ALLOWED_ORIGINS`
4. Deploy!

### Render Deployment

1. Create account on [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set build command: `./mvnw clean package -DskipTests`
5. Set start command: `java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar`
6. Add environment variables (same as Railway)
7. Deploy!

## 📚 Next Steps

- [ ] Add Spring Security for admin authentication
- [ ] Implement JWT tokens
- [ ] Add image upload for blog covers
- [ ] Add pagination for blog listing
- [ ] Add search functionality
- [ ] Add blog categories
- [ ] Add comments system
- [ ] Add analytics tracking

## 🐛 Troubleshooting

### Database Connection Issues
- Verify Neon connection string includes `?sslmode=require`
- Check firewall settings
- Ensure database is not paused (Neon free tier)

### Email Not Sending
- Verify Gmail App Password (not regular password)
- Check spam folder
- Enable "Less secure app access" if using regular password (not recommended)
- Check application logs for detailed error messages

### CORS Errors
- Verify frontend URL in `app.cors.allowed-origins`
- Check browser console for specific CORS error
- Ensure backend is running on port 8081

## 📞 Support

For issues or questions, check the logs:
```bash
tail -f logs/spring-boot-application.log
```

Enable debug logging in `application.properties`:
```properties
logging.level.com.portfolio=DEBUG
```
