import {Component, Inject, Input, OnInit} from "@angular/core";
import {Product} from "../../product";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  newProduct: Product = {
    id: 1,
    title: '',
    description: '',
    price: 0,
    date: ''
  };

  newProductForm = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  picker: MatDatepickerInputEvent<Date> | undefined;
  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public newId: number) { }

  ngOnInit(): void {
    this.newProduct.id = this.newId;
  }

  close() {
    this.dialogRef.close();
  }

  add() {
    this.newProduct.title = this.newProductForm.value.title;
    this.newProduct.description = this.newProductForm.value.description;
    this.newProduct.price = this.newProductForm.value.price;
    this.newProduct.date = new Date(this.newProductForm.value.date).toLocaleDateString();
  }
}
