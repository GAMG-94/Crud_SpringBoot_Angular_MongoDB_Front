import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/model/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[] = [];

  constructor(
    private toast: ToastrService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.listProduct().subscribe(
      data => {
        this.products = data;
      },
      err => {
        this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center' });
      }
    )
  }

  onDelete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Cannot undo it',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(id).subscribe(
          (data) => {
            this.toast.success(data.message, 'Ok', { timeOut: 3000, positionClass: 'toast-top-center' });
            this.getProducts();
          },
          (err) => {
            this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center' });
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Canceled',
          'Product not deleted',
          'error'
        )
      }
    })
  }
}
