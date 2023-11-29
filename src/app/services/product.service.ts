import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productUrl = Environment.apiRestUrl + '/product';

  constructor(private httpClient: HttpClient) { }

  public listProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  public detailProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + `/${id}`);
  }

  public createProduct(product: Product): Observable<any> {
    return this.httpClient.post<any>(this.productUrl, product).pipe(
      catchError((err: HttpErrorResponse) => {
        console.error(err);
        throw err;
      })
    );
  }

  public updateProduct(id: number, product: Product): Observable<any> {
    return this.httpClient.put<any>(this.productUrl + `/${id}`, product).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productUrl + `/${id}`);
  }

}
