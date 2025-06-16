import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './Guard/auth.guard';
import { FeedComponent } from './components/feed/feed.component';
import { ExploreComponent } from './components/explore/explore.component';
import { UserComponent } from './components/user/user.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'profile/edit', component: EditProfileComponent, canActivate: [authGuard] },
  { path: 'feed', component: FeedComponent, canActivate: [authGuard] },
  { path: 'explore', component: ExploreComponent, canActivate: [authGuard] },
  { path: 'contribute', component: PostCreateComponent, canActivate: [authGuard] },
  { path: 'user/:username', component: UserComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: '**', redirectTo: '/feed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
