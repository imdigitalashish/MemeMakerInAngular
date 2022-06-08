import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { MemeEditScreenComponent } from './meme-edit-screen/meme-edit-screen.component';

const routes: Routes = [
  { path: "", component: HomeScreenComponent },
  { path: "meme", component: MemeEditScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
