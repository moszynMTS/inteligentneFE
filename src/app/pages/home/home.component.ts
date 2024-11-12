import { Component, OnInit } from '@angular/core';
import { ApiCaller } from 'src/app/shared/apiCaller';
import { MatDialog } from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  controlerName: string = 'Bike';
  items: any[] = [
    { id:1, title: 'Product 1', price: 19.99 },
    { id:2, title: 'Product 2', price: 29.99 },
    { id:3, title: 'Product 3', price: 39.99 },
    { id:4, title: 'Product 3', price: 39.99 },
    { id:5, title: 'Product 3', price: 39.99 },
    { id:6, title: 'Product 3', price: 39.99 },
    { id:7, title: 'Product 3', price: 39.99 },
    { id:8, title: 'Product 3', price: 39.99 },
    { id:9, title: 'Product 3', price: 39.99 },
  ];
  constructor(private apiCaller: ApiCaller, private dialog: MatDialog, private translate: TranslateService) { 
    console.log("HOME")
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.apiCaller.setControllerPath(this.controlerName);
    // this.apiCaller.getList().subscribe((res:any) => {
    //   this.items = res;
    // })
  }

  addCart(event: MouseEvent, itemId: number): void {
    event.stopPropagation(); // Prevent event from bubbling up and triggering the RouterLink
    console.log(`Item with ID ${itemId} added to cart`);
    // Add your logic here to add the item to the cart
  }

  ping(){
    this.apiCaller.setControllerPath('Ping');
    this.apiCaller.ping().subscribe((res:any)=>{
      console.log("Ping res:", res);
    })
  }
}
