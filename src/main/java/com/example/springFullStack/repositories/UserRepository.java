package com.example.springFullStack.repositories;

import com.example.springFullStack.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}