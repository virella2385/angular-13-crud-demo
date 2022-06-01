import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MasterListComponent} from "./components/master-list/master-list.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";

const routes: Routes = [
  { path: '', component: MasterListComponent },
  { path: 'detail/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
