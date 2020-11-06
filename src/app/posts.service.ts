import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  createAndStorePost(title:string,content:string){
    const postData : Post = {title:title,content:content}
    this.http.post('https://angularfirebaseproject-83938.firebaseio.com/posts.json',postData).subscribe(
      (responseData)=>{
        console.log(responseData);
      }
    );
    console.log(postData);
  }

  fetchPost(){
    return  this.http.get<{[key:string]:Post}>('https://angularfirebaseproject-83938.firebaseio.com/posts.json').pipe(
      map((responseData)=>{
        const postsArray=[];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key],id:key});
          }
        }
        return postsArray;
      })
    )
  }

  deletePost(){
    return this.http.delete('https://angularfirebaseproject-83938.firebaseio.com/posts.json');
  }

}
