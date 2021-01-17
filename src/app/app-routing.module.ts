import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulbPageComponent } from './bulb-page/bulb-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', pathMatch:'full' ,redirectTo:'/home'},
  {path:'home', component:HomeComponent},
  {path:'bulb', component:BulbPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
