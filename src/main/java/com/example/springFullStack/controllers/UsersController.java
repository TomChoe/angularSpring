package com.example.springFullStack.controllers;

import com.example.springFullStack.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.springFullStack.repositories.UserRepository;

@RestController
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/users")
    public Iterable<User> findAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/api/users/{userId}")
    public Optional<User> findAllById(@PathVariable Long userId) {
        return userRepository.findById(userId);
    }

    @DeleteMapping("/api/users/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId) {
        return HttpStatus.OK;
    }

    @PostMapping("/api/users")
    public User createNewUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    @PatchMapping("/api/users/{userId}")
    public User updateUserById(@PathVariable Long userId, @RequestBody User userRequest) {

        User userFromDb = userRepository.findById(userId).get();

        userFromDb.setUserName(userRequest.getUserName());
        userFromDb.setFirstName(userRequest.getFirstName());
        userFromDb.setLastName(userRequest.getLastName());
        userFromDb.setEmail(userRequest.getEmail());

        return userRepository.save(userFromDb);
    }

}