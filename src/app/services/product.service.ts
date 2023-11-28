import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = Environment.apiRestUrl + '/product';

  constructor(private httpClient: HttpClient) { }

  public listProduct():Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  public detailProduct(id: number):Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + `/${id}`);
  }

}
