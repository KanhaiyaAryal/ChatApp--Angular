import { FileUploadModule } from 'ng2-file-upload';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberEditResolver } from './resolvers/member-edit.resolvers';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './resolvers/member-list.resolvers';
import { MemberDetailResolver } from './resolvers/member-detail.resolvers';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { HTTP } from '@ionic-native/http/ngx';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { MessageComponent } from './message/message.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
// import { NgxGalleryModule } from 'ngx-gallery';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessageComponent,
      MemberListComponent,
      ListsComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      TabsModule.forRoot(),
      BsDropdownModule.forRoot(),
      HttpClientModule,
      FileUploadModule,
      // NgxGalleryModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: () => {
              return localStorage.getItem('token');
            },
            whitelistedDomains: ['localhost:4200']
         }
       })
   ],
   providers: [
      HTTP,
      AuthService,
      AlertifyService,
      AuthGuard,
      MemberDetailResolver,
      UserService,
      MemberListResolver,
      MemberEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
