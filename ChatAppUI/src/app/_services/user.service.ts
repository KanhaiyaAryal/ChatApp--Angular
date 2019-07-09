import { map, catchError } from 'rxjs/operators';
import { User } from './../_models/user';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;
  private headers: HttpHeaders;

constructor(private http: HttpClient) {
  this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
}

   getUsers(): Observable<User[]> {
     return this.http.get(this.baseUrl + 'user')
     .pipe(map(response => response as User[]), catchError(this.handlerError));
   }

   getUser(id): Observable<User> {
    return this.http.get(this.baseUrl + 'user/' + id)
    .pipe(map(response => response as User), catchError(this.handlerError));
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'user/' + id, user, {headers: this.headers}).pipe(catchError(this.handlerError));
  }
  setMainPhoto(userId: number, id: number) {
    return this.http.put(this.baseUrl + 'user/' + userId + '/photos/' + id + '/setMain',
    {}, {headers: this.headers}).pipe(catchError(this.handlerError));
  }
  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'user/' + userId + '/photos/' + id).pipe(catchError(this.handlerError));
  }

  private handlerError(error: any) {
    const applicationError = error.header.get('Application-Header');
    if (applicationError) {
      return throwError(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = ' ';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError + '\n';
        }
      }
    }
    return throwError(
      modelStateErrors || 'Server Error'
    );
  }

}
