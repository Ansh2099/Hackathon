package com.ansh.Hackathon_Backend.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Login response containing JWT token")
public class LoginResponseDto {
    
    @Schema(description = "JWT access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String token;
    
    @Schema(description = "Token type", example = "Bearer")
    private String tokenType = "Bearer";
    
    @Schema(description = "Username of the authenticated user", example = "john_doe")
    private String username;
    
    @Schema(description = "User role", example = "USER")
    private String role;
    
    public LoginResponseDto(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.tokenType = "Bearer";
    }
}
