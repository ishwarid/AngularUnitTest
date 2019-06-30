import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookpageComponent } from './bookpage/bookpage.component';

const routes: Routes = [ { path: "", component: BookpageComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
