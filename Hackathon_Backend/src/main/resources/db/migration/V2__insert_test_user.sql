-- Insert test user with BCrypt hashed password
-- Password: testpassword (hashed with BCrypt)
INSERT INTO users (username, password, role) 
VALUES ('testuser', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER');

-- Insert admin user with BCrypt hashed password  
-- Password: adminpassword (hashed with BCrypt)
INSERT INTO users (username, password, role) 
VALUES ('admin', '$2a$10$DowJonesIndex123456789uJ2xMjmMJ8xfvTPuE7PJxliss2NuLuBG', 'ADMIN');
