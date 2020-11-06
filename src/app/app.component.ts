import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Post[]= [];
  isLoading=false;

  constructor(private http: HttpClient,
    private postsService:PostsService) {}

  ngOnInit() {
    this.isLoading=true;
    this.postsService.fetchPost().subscribe((posts)=>{
      this.loadedPosts = posts;
      this.isLoading=false;
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title,postData.content);
    
  }

  onFetchPosts() {
    // Send Http request
    this.isLoading=true;
    this.postsService.fetchPost().subscribe((posts)=>{
      this.loadedPosts = posts;
      this.isLoading=false;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe(()=>{
      this.loadedPosts=[];
    })
  }

  
}
