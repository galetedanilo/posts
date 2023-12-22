import { Component, computed, inject } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostsService } from '../../services/posts.service';
import {
  patchState,
  signalState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PostInterface } from '../../interfaces/post.interface';
import { pipe, switchMap, tap } from 'rxjs';

export interface PostStateInterface {
  posts: PostInterface[];
  isLoading: boolean;
  error: string | null;
}

export const InitialState: PostStateInterface = {
  posts: [],
  isLoading: false,
  error: null,
};

export const PostStore = signalStore(
  withState<PostStateInterface>(InitialState),
  withComputed((store) => ({
    postsCount: computed(() => store.posts().length),
  })),
  withMethods((store, postService = inject(PostsService)) => ({
    addPost(title: string) {
      const newPost: PostInterface = {
        id: crypto.randomUUID(),
        title,
      };

      const updatedPosts = [...store.posts(), newPost];

      patchState(store, { posts: updatedPosts });
    },
    removePost(id: string) {
      const updatedPosts = store.posts().filter((post) => post.id !== id);

      patchState(store, { posts: updatedPosts });
    },
    addPosts(posts: PostInterface[]) {
      patchState(store, { posts });
    },
    loadPosts: rxMethod<void>(
      pipe(
        switchMap(() => {
          return postService.getPosts().pipe(
            tap((posts) => {
              patchState(store, { posts });
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.loadPosts();
    },
  })
);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PostFormComponent],
  providers: [PostStore],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {
  // #service = inject(PostsService);

  store = inject(PostStore);

  // state = signalState<PostStateInterface>({
  //   posts: [],
  //   error: null,
  //   isLoading: false,
  // });

  // ngOnInit(): void {
  //   this.#service.getPosts().subscribe({
  //     next: (posts) => this.store.addPosts(posts),
  //   });
  // }

  onSubmit(post: PostInterface) {
    if (post.id) {
    } else {
      // const newPost = { ...post, id: crypto.randomUUID() };

      // const updatedPosts = [...this.state.posts(), newPost];

      // patchState(this.state, (state) => ({ ...state, posts: updatedPosts }));
      this.store.addPost(post.title);
    }
  }

  // onRemovePost(id: string) {
  //   const updatedPosts = this.state.posts().filter((post) => post.id !== id);

  //   patchState(this.state, (state) => ({ ...state, posts: updatedPosts }));
  // }
}
