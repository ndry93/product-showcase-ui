import { Routes } from '@angular/router';

import { ProductsComponent } from "./products/products.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";


export const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "home", component: HomeComponent },

  // otherwise redirect to home
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

