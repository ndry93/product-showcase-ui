import { Component, OnInit, OnDestroy } from "@angular/core";
import { first } from "rxjs/operators";

import { Product } from "@/_models";
import { ProductService } from "@/_services";
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  templateUrl: "products.component.html",
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedProduct: Product;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  constructor(
    private productService: ProductService
  ) {
  }

  selectUser(event: Event, product: Product) {
    this.selectedProduct = product;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onDialogHide() {
    this.selectedProduct = null;
  }

  ngOnInit() {}

  ngOnDestroy() {}

  deleteProduct(id: number) {
    this.productService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllProducts();
      });
  }

  private loadAllProducts() {
    this.productService
      .getAll()
      .pipe(first())
      .subscribe((products) => {
        this.products = products;
      });
  }
}
