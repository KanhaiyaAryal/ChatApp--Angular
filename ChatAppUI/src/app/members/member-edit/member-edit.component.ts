import { AuthService } from './../../_services/Auth.service';
import { UserService } from './../../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ContentChild } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ContentChild('editForm' , {static: false}) editForm: NgForm;
  constructor(private route: ActivatedRoute, private aleritify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }
  updateUser() {
    // this.aleritify.success('Success Update');
    // console.log(this.user);
    // //this.editForm.onReset();
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.aleritify.success('Profile Updated');
      this.editForm.reset(this.user);
      console.log(this.user);
    }, error => {
      this.aleritify.error('Error Updating user');
    });
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
