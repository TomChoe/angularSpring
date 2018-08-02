package com.example.springFullStack.controllers;

import com.example.springFullStack.models.Post;
import com.example.springFullStack.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import com.example.springFullStack.repositories.PostRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class PostsController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping("/api/posts")
    public Iterable<Post> findAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/api/posts/{postId}")
    public Optional<Post> findPostById(@PathVariable Long postId) {
        return postRepository.findById(postId);
    }

    @DeleteMapping("/api/posts/{postId}")
    public HttpStatus deletePostById(@PathVariable Long postId) {
        postRepository.deleteById(postId);
        return HttpStatus.OK;
    }

    @PostMapping("/api/posts")
    public Post createNewPost(@RequestBody Post newPost) {
        return postRepository.save(newPost);
    }

    @PatchMapping("/api/posts/{postId}")
    public Post updatePostById(@PathVariable Long postId, @RequestBody Post postRequest) {

        Post postFromDb = postRepository.findById(postId).get();

        postFromDb.setTitle(postRequest.getTitle());
        postFromDb.setPrice(postRequest.getPrice());
        postFromDb.setBody(postRequest.getBody());

        return postRepository.save(postFromDb);
    }

}