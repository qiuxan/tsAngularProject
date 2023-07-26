import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
interface Post {
  id: number;
  title: string | null;
  body: string | null;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts: Post[] = [];
  private url = 'https://jsonplaceholder.typicode.com/posts';

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };
    input.value = '';
    this.http
      .post<{ id: number } | null>(this.url, JSON.stringify(post))
      .subscribe((response) => {
        post['id'] = response?.id;
        this.posts.splice(0, 0, post);
      });

    console.log(input.value);
  }

  constructor(private http: HttpClient) {
    this.http.get<Post[]>(this.url).subscribe((response) => {
      this.posts = response;
      // console.log(this.posts);
    });
  }
}
