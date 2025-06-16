import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PostDetailComponent } from './features/post-detail/post-detail.component';
import { NewsComponent } from './features/news/news.component';

const routes: Routes = [
  { path: '', component: HomeComponent, runGuardsAndResolvers: 'always' },
  { 
    path: 'post/:id', 
    component: PostDetailComponent,
    runGuardsAndResolvers: 'always'
  },
  { path: 'news', component: NewsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
