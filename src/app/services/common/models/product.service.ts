import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : CustomHttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?:(message: Array<string>) => void){
    this.httpClient.post({
      controller: "products"
    }, product).subscribe(result =>{
      successCallBack();
    }, (errorResponse: HttpErrorResponse)=>{
      errorResponse.error
      const _error: Array<{key: string, value: Array<string>}> =errorResponse.error;
      let errorMessages: Array<string> = [];
      _error.forEach((v, index) => {
        v.value.forEach((_v, _index) => {
          errorMessages.push(_v);
        })
      })
      errorCallBack(errorMessages);
    });

  }

  async list(page: number = 0, size: number = 5, successCallBack?: ()=> void, errorCallBack?: (errorMessage: string)=> void): Promise<{totalCount: number, products: List_Product[]}>{
    const promiseData: Promise<{totalCount: number, products: List_Product[]}> =  this.httpClient.get<{totalCount: number, products: List_Product[]}>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=> successCallBack())
    .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }
}
