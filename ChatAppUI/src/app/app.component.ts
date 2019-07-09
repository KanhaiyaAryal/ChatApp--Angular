import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/Auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ChatAppUI';

  constructor(private authService: AuthService, public jwtHelper: JwtHelperService) {}
   ngOnInit() {
     const token = localStorage.getItem('token');
     const user: User = JSON.parse(localStorage.getItem('user'));
     if (token) {
       this.authService.decodedToken = this.jwtHelper.decodeToken(token);
     }
     if (user) {
      this.authService.currentUser = user;
      if (this.authService.currentUser.photoUrl !== null) {
        this.authService.changeMemberPhoto(user.photoUrl);
      } else {
        this.authService.changeMemberPhoto('../assets/user.png');
      }

    }
   }
}
