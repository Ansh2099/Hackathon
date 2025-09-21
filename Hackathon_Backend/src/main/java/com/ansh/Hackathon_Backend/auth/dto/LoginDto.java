package com.ansh.Hackathon_Backend.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Login request payload")
public class LoginDto {
    
    @NotBlank(message = "Username is required")
    @Schema(description = "Username", example = "john_doe")
    private String username;
    
    @NotBlank(message = "Password is required")
    @Schema(description = "Password", example = "securePassword123")
    private String password;
}
