package com.voltpro.voltstore.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

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
                .servers(List.of(localServer));
    }
}
