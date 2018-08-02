package com.example.springFullStack.repositories;

import com.example.springFullStack.models.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {

}