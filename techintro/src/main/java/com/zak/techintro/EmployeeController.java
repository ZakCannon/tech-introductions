package com.zak.techintro;

import net.minidev.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin
public class EmployeeController {
    @GetMapping("/")
    public ResponseEntity<String> index() {
        return new ResponseEntity<>("{\"body\": \"Greetings from Spring Boot!\"}", HttpStatus.OK);
    }
}