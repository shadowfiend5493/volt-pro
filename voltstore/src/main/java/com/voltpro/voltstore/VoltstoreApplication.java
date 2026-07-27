package com.voltpro.voltstore;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAwareImpl")
public class VoltstoreApplication {

	private static final Logger LOGGER = LoggerFactory.getLogger(VoltstoreApplication.class);

	public static void main(String[] args) {
		LOGGER.info("Starting VoltPro Store application");
		SpringApplication.run(VoltstoreApplication.class, args);
		LOGGER.info("VoltPro Store application started successfully");
	}

}
