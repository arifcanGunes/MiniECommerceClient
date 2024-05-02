import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyMessageType, AlertifyPosition, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { SpinnerType, ToastrComponent } from 'src/app/services/common/toastr/toastr.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends ToastrComponent implements OnInit {
  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  ngOnInit(): void {

  }

  create(txtName: HTMLInputElement, txtPrice: HTMLInputElement, txtStock: HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom);
    const createProduct: Create_Product = new Create_Product();
    createProduct.name = txtName.value;
    createProduct.price = parseInt(txtPrice.value);
    createProduct.stock = parseInt(txtStock.value);

    this.productService.create(createProduct, ()=>{
      this.alertify.message("Ekleme işlemi başarılı şekilde gerçekleşti.", {
        messageType: AlertifyMessageType.Success,
        delay: 3,
        position: AlertifyPosition.BottomRight,
        dismissOthers: true
      });
      this.hideSpinner(SpinnerType.BallAtom);
      this.createdProduct.emit(createProduct);
    }, (errorMessages: Array<string>)=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ekleme işlemi sırasında hatayla karşılaşıldı.", {
        messageType: AlertifyMessageType.Error
      });
      errorMessages.forEach((message) => {
        this.alertify.message(message, {
          messageType: AlertifyMessageType.Error
        });
      })
    });
  }


}
