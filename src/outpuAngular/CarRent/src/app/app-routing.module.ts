import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarrentComponent } from './carrent/carrent.component';
const routes: Routes = [
  { path: '', component: CarrentComponent },{ path: 'carrent', component: CarrentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
