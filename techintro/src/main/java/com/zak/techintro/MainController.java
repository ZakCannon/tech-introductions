package com.zak.techintro;

import org.springframework.beans.factory.annotation.Autowired;
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
    public @ResponseBody String addNewUser (@RequestBody User newUser) {
        String rawPassword = newUser.getPassword();

        userRepository.save(newUser);
        return "Saved";
    }

    @PostMapping(path="/login")
    public @ResponseBody String checkExistingUser (@RequestBody User testUser) throws FailedLoginException {
        User userFromDB = userRepository.findUserByEmail(testUser.getEmail());
        if (Objects.equals(userFromDB.getPassword(), testUser.getPassword())) {
            return "Logged in";
        } else {
            throw new FailedLoginException();
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }
}
