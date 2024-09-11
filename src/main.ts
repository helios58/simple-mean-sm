import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from "@angular/common/http";
import { RegistrationComponent } from './app/components/registration/registration.component';
import { AppComponent } from './app/app.component';
import { PostComponent } from './app/components/post/post/post.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './app/services/auth.guard';
import { TokenInterceptor } from './app/services/request.interceptor';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: PostComponent , canActivate: [AuthGuard]},

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true } 
  ]
}).catch(err => console.error(err));
