package com.example.sportgather;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class SportgatherApplication {

	public static void main(String[] args) {
		SpringApplication.run(SportgatherApplication.class, args);
	}

}
