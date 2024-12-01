import { Component, OnInit } from '@angular/core';
import { ApiCaller } from 'src/app/shared/apiCaller';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { TranslateService } from '@ngx-translate/core';
import { ControllerNames } from 'src/app/shared/controlerNames';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: any[] = [
    { id:1, title: 'Product 1', price: 19.99 },
    { id:2, title: 'Product 2', price: 29.99 },
    { id:3, title: 'Product 3', price: 39.99 },
    { id:4, title: 'Product 4', price: 39.99 },
    { id:5, title: 'Product 5', price: 39.99 },
    { id:6, title: 'Product 6', price: 39.99 },
    { id:7, title: 'Product 7', price: 39.99 },
    { id:8, title: 'Product 8', price: 39.99 },
    { id:9, title: 'Product 9', price: 39.99 },
  ];
  categories: any[] = [{id: 1},{id: 2}]
  genders: any[] = [{id: 1},{id: 2}]
  materials: any[] = [{id: 1},{id: 2}]
  searchForm: FormGroup; 
  constructor(private apiCaller: ApiCaller,private fb: FormBuilder, private dialog: MatDialog, private translate: TranslateService, private snackBar: MatSnackBar) { 
    this.searchForm = this.fb.group({
      searchTerm: [""],
      category: [""],
      gender: [""],
      material: [""],
      pageNumber: 1,
      pageSize: 15,
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apiCaller.setControllerPath(ControllerNames.Product);
    this.apiCaller.getList(this.searchForm.value).subscribe((res:any) => {
      this.items = res.content.result;
    })
  }

  addCart(event: MouseEvent, item: any): void {
    event.stopPropagation();
    let cart = localStorage.getItem('cart') ?? '';
    let cartArray = cart ? JSON.parse(cart) : [];
    let existingItem = cartArray.find((itemEx: any) => itemEx.id === item.id);
    if (existingItem != null && existingItem != undefined) {
      existingItem.quantity += 1;
    } else {
      console.log({ id:item.id, title:item.name, price:item.price, quantity: 1, url: item.url })
      cartArray.push({ id:item.id, title:item.name, price:item.price, quantity: 1, url: item.url });
    }
    this.snackBar.open(this.translate.instant('Snackbar.CartAdd'), this.translate.instant('Snackbar.Close'), {
      duration: 2000,
      horizontalPosition: 'center', 
      verticalPosition: 'bottom'
    });
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
  

  ping(){
    this.apiCaller.setControllerPath('Ping');
    this.apiCaller.ping().subscribe((res:any)=>{
      console.log("Ping res:", res);
    })
  }
  clearSearch(event: MouseEvent){
    event.stopPropagation();
    Object.keys(this.searchForm.controls).forEach(key => {
      this.searchForm.get(key)?.patchValue('');
    });
    
  }
}
