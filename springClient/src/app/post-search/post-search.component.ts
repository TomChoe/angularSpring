import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
	debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})

export class PostSearchComponent implements OnInit {

  posts$: Observable<Post[]>;
  private searchTerms = new Subject<string>();

  constructor(private postService: PostService) { }

  search(term: string): void {
  	this.searchTerms.next(term);
  }

  ngOnInit(): void {
  	this.posts$ = this.searchTerms.pipe(
  		debounceTime(300),

  		distinctUntilChanged(),

  		switchMap((term: string) => this.postService.searchPosts(term)),
  	);
  }

}
