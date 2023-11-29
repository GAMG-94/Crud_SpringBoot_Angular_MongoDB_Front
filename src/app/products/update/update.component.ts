import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})

export class UpdateComponent implements OnInit {

  id!: number;
  product: Product = { "id": 0, "name": '', "price": 0 };
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getProduct();
  }

  onUpdate(): void {
    const productId = this.product.id;
    this.productService.updateProduct(productId, this.product).subscribe(
      (data) => {
        this.product = data;
        this.toast.success(data.message, 'Ok', { timeOut: 3000, positionClass: 'toast-top-center'});
        this.router.navigate(['']);
      },
      (error) => {
        this.toast.error(error.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-right' });
        this.router.navigate(['']);
      }
    );
  }

  getProduct(): void {
    const id = this.activateRoute.snapshot.params['id'];
    this.productService.detailProduct(id).subscribe(
      (data) => {
        this.product = data;
      },
      (error) => {
        this.toast.error(error.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-right' });
        this.router.navigate(['']);
      }
    );
  }
}
