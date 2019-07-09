
import { error } from '@angular/compiler/src/util';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/api/auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  changeMemberPhoto(photoUrl) {
    this.photoUrl.next(photoUrl);
  }
  login(model: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + 'login', model, {headers} ).pipe(map((response ) => {
      localStorage.setItem('token', JSON.stringify(response));
      localStorage.setItem('user', JSON.stringify(response));
      this.decodedToken = this.jwtHelper.decodeToken(JSON.stringify(response));
      this.changeMemberPhoto(this.currentUser.photoUrl);
      console.log(this.decodedToken);
    }), catchError(this.handlerError));

  }

  register(model: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.baseUrl + 'register', model, {headers}).pipe(catchError(this.handlerError));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
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
