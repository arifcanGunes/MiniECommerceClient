import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType, ToastrComponent } from 'src/app/services/common/toastr/toastr.component';
declare var $:any
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends ToastrComponent implements OnInit {
  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    var allProducts: {totalCount: number, products: List_Product[]} = await this.productService.list(this.paginator ? this.paginator.pageIndex: 0, this.paginator ? this.paginator.pageSize : 5, ()=>{
      this.hideSpinner(SpinnerType.BallAtom);
    }, (errorMessage: string)=>{
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error
      });
    });
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
  async ngOnInit(): Promise<void> {
    await this.getProducts();
  }

  async pageChanged(){
    await this.getProducts();
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'update', 'delete'];
  dataSource :MatTableDataSource<List_Product> = null;

  
}
