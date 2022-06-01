import {Component, Input, OnInit} from '@angular/core';
import { DATA } from '../../data';
import { MatDialog } from '@angular/material/dialog';
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";
import {DataSource, SelectionModel} from "@angular/cdk/collections";
import {Observable, ReplaySubject} from "rxjs";
import {Product} from "../../product";
import {Router} from "@angular/router";


@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {
  products = DATA;
  dataSource = new ExampleDataSource(this.products);
  displayedColumns: string[] = ['select', 'edit', 'id', 'title', 'price', 'description', 'date'];
  selection = new SelectionModel<Product>(true, []);
  updatedProduct: any;

  constructor(public dialog: MatDialog,
              private router: Router) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.updatedProduct = this.router.getCurrentNavigation()?.extras.state;
      this.products = this.products.map(el => {
        if (el.id == this.updatedProduct.id) {
          el.title = this.updatedProduct.title;
          el.price = this.updatedProduct.price;
          el.description = this.updatedProduct.description;
          el.date = this.updatedProduct.date
        }
        return el;
      });

    }
  }

  ngOnInit(): void {

  }

  openAddAProductDialog() {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '800px', data: this.getNewId(), disableClose: true
    });

    dialogRef.afterClosed().subscribe(newProduct => {
      if (!newProduct || !newProduct.title) {
       return;
      }
      this.products.push(newProduct);
      this.dataSource.setData(this.products);
    });
  }

  removeProducts() {
    if (this.selection && this.selection.selected.length) {
      this.products = this.products.filter(el => this.selection.selected.indexOf(el) < 0);
      this.dataSource.setData(this.products);
    }
  }

  getNewId() {
    const index = this.products.length - 1;
    return ((this.products && this.products[index]) ? this.products[index].id + 1 : 1);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.products.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.products);
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  view() {
    console.debug(this.selection.selected);
  }
}

class ExampleDataSource extends DataSource<Product> {
  private _dataStream = new ReplaySubject<Product[]>();

  constructor(initialData: Product[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Product[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Product[]) {
    this._dataStream.next(data);
  }
}
