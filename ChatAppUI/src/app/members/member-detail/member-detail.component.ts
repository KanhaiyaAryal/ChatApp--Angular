import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
// import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'hammerjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    // this.galleryOptions = [
    //   {
    //       width: '600px',
    //       height: '400px',
    //       thumbnailsColumns: 4,
    //       imageAnimation: NgxGalleryAnimation.Slide
    //   },
    //   // max-width 800
    //   {
    //       breakpoint: 800,
    //       width: '100%',
    //       height: '600px',
    //       imagePercent: 80,
    //       thumbnailsPercent: 20,
    //       thumbnailsMargin: 20,
    //       thumbnailMargin: 20
    //   },
    //   // max-width 400
    //   {
    //       breakpoint: 400,
    //       preview: false
    //   }
    // ];
    // this.galleryImages = this.getImages();
  }
  getImages() {
    const imageUrl = [];
    for (let i = 0; i < this.user.photoUrl.length; i++) {
      imageUrl.push ({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrl;
  }

}
