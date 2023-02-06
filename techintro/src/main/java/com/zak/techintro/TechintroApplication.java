package com.zak.techintro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.zak.techintro")
@EntityScan("com.zak.techintro")
public class TechintroApplication {
	public static void main(String[] args) {
		SpringApplication.run(TechintroApplication.class, args);
	}

}
