import { Component, ViewChild } from '@angular/core';
import { Create_Product } from 'src/app/contracts/create_product';
import { ListComponent } from './list/list.component';
import { List_Product } from 'src/app/contracts/list_product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @ViewChild(ListComponent) listComponents: ListComponent

  createdProduct(createdProduct: Create_Product){
    this.listComponents.getProducts();
  }
}
