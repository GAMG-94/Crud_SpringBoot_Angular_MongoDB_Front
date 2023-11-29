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

  // Listado de productos
  public listProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.productUrl);
  }

  // Detalle de los productos
  public detailProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.productUrl + `/${id}`);
  }

  // Creación de un producto nuevo
  public createProduct(product: Product): Observable<any> {
    return this.httpClient.post<any>(this.productUrl, product).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  // Actualización de un producto
  public updateProduct(id: number, product: Product): Observable<any> {
    return this.httpClient.put<any>(this.productUrl + `/${id}`, product).pipe(
      catchError((err: HttpErrorResponse) => {
        throw err;
      })
    );
  }

  // Eliminación de un producto
  public deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productUrl + `/${id}`);
  }

}
