import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ApiCaller } from 'src/app/shared/apiCaller';
import { ControllerNames } from 'src/app/shared/controlerNames';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  item: any = { id:1, title: 'Product 1', price: 19.99, description: "Opis opis opis opis" };
  constructor(
    private route: ActivatedRoute, 
    private apiCaller: ApiCaller,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let id = params['id'];
      console.log(id);  // Outputs the value of 'id' from the URL
      this.apiCaller.setControllerPath(ControllerNames.Product)
      this.apiCaller.getItem(id).subscribe((res:any)=>{
        this.item = res.content;
        console.log(this.item)
      })
    });
  }
  addCart(event: MouseEvent, item: any): void {
    event.stopPropagation();
    let cart = localStorage.getItem('cart') ?? '';
    let cartArray = cart ? JSON.parse(cart) : [];
    let existingItem = cartArray.find((itemEx: any) => itemEx.id === item.id);
    if (existingItem != null && existingItem != undefined) {
      existingItem.quantity += 1;
    } else {
      cartArray.push({ id:item.id, title:item.name, price:item.price, quantity: 1, url: item.url });
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
  
}
