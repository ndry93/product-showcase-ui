import { Routes } from '@angular/router';

import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";


export const routes: Routes = [
  { path: "products", component: ProductsComponent },
  { path: "product-detail", component: ProductDetailComponent },
  { path: "home", component: HomeComponent },

  // otherwise redirect to home
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

