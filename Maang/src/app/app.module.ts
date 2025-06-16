import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { HomeComponent } from './features/home/home.component';
import { PostDetailComponent } from './features/post-detail/post-detail.component';
import { NewsComponent } from './features/news/news.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CompanyComponent } from './features/company/company.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostCardComponent,
    HomeComponent,
    PostDetailComponent,
    NewsComponent,
    CompanyComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, runGuardsAndResolvers: 'always' },
      { path: 'news', component: NewsComponent },
      { 
      path: 'post/:id', 
      component: PostDetailComponent,
      runGuardsAndResolvers: 'always' 
    },
      { path: 'company/:company', component: HomeComponent }, 
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }