import { Injectable } from '@angular/core';
import { Post } from './post';
// import { POSTS } from './mock-posts';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private postsUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
  	return this.http.get<Post[]>(this.postsUrl)
  	  .pipe(
  	  	catchError(this.handleError('getPosts', []))
  	  );
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url)
      .pipe(
        catchError(this.handleError<Post>(`getHero id=${id}`))
      );
  }

  updatePost (post: Post): Observable<any> {
    return this.http.patch(this.postsUrl + '/' + post.id, post, httpOptions)
      .pipe(
        catchError(this.handleError<any>('updatePost'))
      );
  }

  addPost (post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, httpOptions)
      .pipe(
        catchError(this.handleError<Post>('addPost'))
      );
  }

  deletePost (post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url  = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions)
      .pipe(
        catchError(this.handleError<Post>('deletePost'))
      );
  }

  searchPosts (term: string): Observable<Post[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Post[]>(`${this.postsUrl}/?title=${term}`)
      .pipe(
        catchError(this.handleError<Post[]>('searchPosts', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('There was a problem retrieving data');
      console.error(error);
      return of(result as T);
    };
  }
}