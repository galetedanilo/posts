import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostInterface } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css',
})
export class PostFormComponent {
  @Output() submitedEmitter = new EventEmitter<PostInterface>();
  protected form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
  });

  onSubmit() {
    this.submitedEmitter.emit(this.form.getRawValue() as PostInterface);
    this.form.reset();
  }
}
