import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../product";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedProduct: any;
  updatedProduct: Product = {
    title: '',
    id: 0,
    price: 0,
    date: new Date().toLocaleDateString(),
    description: ''
  };

  productForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.selectedProduct = this.router.getCurrentNavigation()?.extras.state;
    if (!this.selectedProduct) this.back();
  }

  ngOnInit(): void {
    this.productForm.patchValue({
      title: this.selectedProduct.title,
      price: this.selectedProduct.price,
      description: this.selectedProduct.description,
      date: new Date(this.selectedProduct.date)
    });
  }

  save() {
    this.updatedProduct = {
      title: this.productForm.value.title,
      price: this.productForm.value.price,
      description: this.productForm.value.description,
      id: this.selectedProduct.id,
      date: (new Date(this.productForm.value.date)).toLocaleDateString()
    };
    this.router.navigate([''], {state: this.updatedProduct});
  }

  back() {
    this.router.navigate(['']);
  }
}
