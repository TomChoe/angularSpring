import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {

  constructor(private postService: PostService, 
              private location: Location) { }

  posts: Post[];

  getPosts(): void {
    this.postService.getPosts()
      .subscribe(posts => this.posts = posts)
  }

  add(title: string, price: number, body: string): void {
    title = title.trim();
    if (!title || !price || !body) { return; }
    this.postService.addPost({ title, price, body } as Post)
      .subscribe(post => {
        this.posts.push(post);
        window.location.reload();
      })
  }

  delete(post: Post): void {
    this.posts = this.posts.filter(p => p !== post);
    this.postService.deletePost(post).subscribe(() => 
      window.location.reload());  // refresh instead of going back
  }

  ngOnInit() {
    this.getPosts();
  }
}