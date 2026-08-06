package com.voltpro.voltstore.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    private static final String BEARER_SECURITY_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI voltProOpenApi() {
        Server localServer = new Server()
                .url("http://localhost:8080")
                .description("Local Spring Boot API");

        Info apiInfo = new Info()
                .title("VoltPro Store API")
                .version("v1")
                .description("OpenAPI documentation for VoltPro engineers, contact requests, and store endpoints.");

        return new OpenAPI()
                .info(apiInfo)
                .components(new Components().addSecuritySchemes(
                        BEARER_SECURITY_SCHEME,
                        new SecurityScheme()
                                .name(BEARER_SECURITY_SCHEME)
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                ))
                .addSecurityItem(new SecurityRequirement().addList(BEARER_SECURITY_SCHEME))
                .servers(List.of(localServer));
    }
}
