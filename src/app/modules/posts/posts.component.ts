import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: ` 
    <header>
      <h1>Posts Manager</h1>
    </header>
    <section>
      <router-outlet />
    </section>`,
})
export class PostsComponent {}
