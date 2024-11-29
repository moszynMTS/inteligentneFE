import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiCaller } from 'src/app/shared/apiCaller';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  item: any = { id:1, title: 'Product 1', price: 19.99, description: "Opis opis opis opis" };
  constructor(
    private apiCaller: ApiCaller,
  ) {}

  ngOnInit(): void {
  }
  addCart(event: MouseEvent, item: any): void {
    event.stopPropagation();
    let cart = localStorage.getItem('cart') ?? '';
    let cartArray = cart ? JSON.parse(cart) : [];
    let existingItem = cartArray.find((itemEx: any) => itemEx.id === item.id);
    if (existingItem != null && existingItem != undefined) {
      existingItem.quantity += 1;
    } else {
      cartArray.push({ id:item.id, title:item.title, price:item.price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cartArray));
  }
  
}
