import { AuthService } from './../_services/Auth.service';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {

    constructor(private userService: UserService,
                private router: Router, private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(catchError((err => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return of(null);
        })));
    }

}
