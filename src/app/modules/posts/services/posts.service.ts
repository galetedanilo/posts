import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  #http = inject(HttpClient);

  getPosts(): Observable<PostInterface[]> {
    const posts = [
      { id: 'abc123', title: 'Post sobre a vida é bela' },
      { id: 'abc124', title: 'Um lindo lugar para morar' },
      { id: 'abc125', title: 'Bora brincar de pipa' },
      { id: 'abc126', title: 'Tudo novo de novo novamente' },
    ];

    return of(posts).pipe(delay(2000));
  }
}
