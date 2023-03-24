package com.zak.techintro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.FailedLoginException;
import java.util.Objects;

@Controller
@RequestMapping(path="/users")
public class MainController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add")
    public @ResponseBody ResponseEntity<String> addNewUser (@RequestBody User newUser) {
        User existingUser = userRepository.findUserByEmail(newUser.getEmail());

        if (existingUser != null) {
            return new ResponseEntity<>("User already exists", HttpStatus.FORBIDDEN);
        }

        userRepository.save(newUser);
        return new ResponseEntity<>("Sign up successful", HttpStatus.OK);
    }

    @PostMapping(path="/login")
    public @ResponseBody ResponseEntity<String> checkExistingUser (@RequestBody User testUser) {
        User userFromDB = userRepository.findUserByEmail(testUser.getEmail());

        if (userFromDB == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        if (Objects.equals(userFromDB.getPassword(), testUser.getPassword())) {
            return new ResponseEntity<>("Login Successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Password not matched", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
