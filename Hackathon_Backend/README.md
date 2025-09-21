# 🚀 Hackathon Backend Starter Kit

A production-ready Spring Boot backend starter kit designed for hackathon projects. Features JWT authentication, PostgreSQL database with Flyway migrations, comprehensive API documentation with Swagger, and deployment-ready Docker configuration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database](#database)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)

## ✨ Features

- **🔐 JWT Authentication**: Stateless authentication with custom JWT implementation
- **🗄️ PostgreSQL Database**: Production-ready database with connection pooling
- **🔄 Database Migrations**: Version-controlled schema management with Flyway
- **📚 API Documentation**: Auto-generated OpenAPI 3.0 documentation with Swagger UI
- **🐳 Docker Ready**: Multi-stage Dockerfile and docker-compose for local development
- **☁️ Cloud Deployment**: Ready-to-deploy configuration for Render
- **🛡️ Security**: BCrypt password hashing, CORS configuration, and security headers
- **📊 Monitoring**: Health checks and actuator endpoints
- **🔧 Error Handling**: Centralized exception handling with standardized error responses

## 🛠️ Tech Stack

- **Java 21** - Latest LTS version
- **Spring Boot 3.x** - Framework
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database abstraction
- **PostgreSQL** - Primary database
- **Flyway** - Database migrations
- **JWT** - Token-based authentication
- **Maven** - Build tool
- **Docker** - Containerization
- **Swagger/OpenAPI** - API documentation

## 🚀 Quick Start

### Prerequisites

- Java 21 or higher
- Maven 3.6+
- Docker & Docker Compose (for local development)
- PostgreSQL (if running without Docker)

### Local Development with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hackathon_Backend
   ```

2. **Start the application with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - API Base URL: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui/index.html
   - Health Check: http://localhost:8080/actuator/health

### Local Development without Docker

1. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE hackathon_db;
   CREATE USER hackathon_user WITH PASSWORD 'hackathon_password';
   GRANT ALL PRIVILEGES ON DATABASE hackathon_db TO hackathon_user;
   ```

2. **Configure environment variables**
   ```bash
   export DATABASE_URL=jdbc:postgresql://localhost:5432/hackathon_db
   export DATABASE_USERNAME=hackathon_user
   export DATABASE_PASSWORD=hackathon_password
   export JWT_SECRET=myVerySecretKeyThatShouldBeAtLeast256BitsLongForHS256Algorithm
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

## 📚 API Documentation

### Swagger UI
Access the interactive API documentation at: http://localhost:8080/swagger-ui/index.html

### Authentication Endpoints

#### Sign Up
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securePassword123"
}
```

#### Using JWT Token
Include the JWT token in the Authorization header for protected endpoints:
```http
Authorization: Bearer <your-jwt-token>
```

## 🔐 Authentication

### JWT Configuration
- **Algorithm**: HS256
- **Default Expiration**: 1 hour (configurable)
- **Claims**: username (sub), role, issued at (iat), expiration (exp)

### Default Test Users
- **Username**: `testuser`, **Password**: `testpassword`, **Role**: `USER`
- **Username**: `admin`, **Password**: `adminpassword`, **Role**: `ADMIN`

### Security Features
- Passwords are hashed using BCrypt
- Stateless session management
- CORS enabled for all origins (configurable)
- Protected endpoints require valid JWT

## 🗄️ Database

### Schema Management
Database schema is managed using Flyway migrations located in `src/main/resources/db/migration/`:

- `V1__create_users_table.sql` - Creates users table with indexes
- `V2__insert_test_user.sql` - Inserts default test users

### Database Configuration
Configure database connection using environment variables:
- `DATABASE_URL` - JDBC connection string
- `DATABASE_USERNAME` - Database username
- `DATABASE_PASSWORD` - Database password

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with docker-compose
docker-compose up --build

# Or build and run manually
docker build -t hackathon-backend .
docker run -p 8080:8080 hackathon-backend
```

### Render Deployment
1. Connect your GitHub repository to Render
2. Use the provided `render.yaml` for infrastructure as code
3. Set environment variables in Render dashboard
4. Deploy from your main branch

### Environment Variables for Production
```bash
DATABASE_URL=<your-postgres-connection-string>
DATABASE_USERNAME=<your-db-username>
DATABASE_PASSWORD=<your-db-password>
JWT_SECRET=<your-256-bit-secret>
JWT_EXPIRATION=3600000
SPRING_PROFILES_ACTIVE=production
```

## 📁 Project Structure

```
src/main/java/com/ansh/Hackathon_Backend/
│
├── auth/                          # Authentication module
│   ├── controller/AuthController.java
│   ├── dto/                       # Data Transfer Objects
│   │   ├── SignUpDto.java
│   │   ├── LoginDto.java
│   │   └── LoginResponseDto.java
│   ├── entity/User.java           # User entity
│   ├── repository/UserRepository.java
│   ├── service/AuthService.java   # Business logic
│   └── security/                  # Security configuration
│       ├── JwtAuthenticationFilter.java
│       ├── JwtUtil.java
│       └── SecurityConfig.java
│
├── common/                        # Shared components
│   ├── dto/ErrorResponse.java
│   ├── exception/                 # Exception handling
│   │   ├── GlobalExceptionHandler.java
│   │   └── ResourceNotFoundException.java
│   └── config/OpenApiConfig.java  # Swagger configuration
│
└── features/                      # Future business features
    └── [feature_name]/
        ├── controller/
        ├── dto/
        ├── entity/
        ├── repository/
        └── service/
```

## ⚙️ Configuration

### Application Properties
Key configuration options in `application.yml`:

```yaml
# Database
spring.datasource.url: ${DATABASE_URL}
spring.datasource.username: ${DATABASE_USERNAME}
spring.datasource.password: ${DATABASE_PASSWORD}

# JWT
jwt.secret: ${JWT_SECRET}
jwt.expiration: ${JWT_EXPIRATION:3600000}

# Server
server.port: ${PORT:8080}
```

### Profiles
- `default` - Local development
- `docker` - Docker environment
- `production` - Production deployment

## 🧪 Testing

### Run Tests
```bash
mvn test
```

### Test with Swagger UI
1. Start the application
2. Navigate to http://localhost:8080/swagger-ui/index.html
3. Use the "Authorize" button to input your JWT token
4. Test all endpoints interactively

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Review the API documentation at `/swagger-ui/index.html`
3. Verify your environment variables are set correctly
4. Check application logs for detailed error messages

## 🎯 Next Steps

After setting up the basic authentication system, you can:

1. **Add new features** in the `features/` directory
2. **Extend user profiles** with additional fields
3. **Implement role-based access control** for different endpoints
4. **Add email verification** for user registration
5. **Implement password reset** functionality
6. **Add rate limiting** for API endpoints
7. **Set up monitoring** and logging solutions

---

**Happy Hacking! 🚀**
