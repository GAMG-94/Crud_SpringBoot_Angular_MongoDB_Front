import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{

  name!: string;
  price!: number;
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [Number, Validators.required]
    });
  }

  ngOnInit(): void { }

  onCreate(): void {
    if (this.productForm.valid) {
      const { name, price } = this.productForm.value;
      const product = new Product(name, price);
      this.productService.createProduct(product).subscribe(
        data => {
          this.toast.success(data.message, 'Ok', { timeOut: 3000, positionClass: 'toast-top-center'});
          this.router.navigate(['']);
        },
        err => {
          this.toast.error(err.error.message, 'Error', { timeOut: 3000, positionClass: 'toast-top-center'});
        }
      );
    }
  }
}
