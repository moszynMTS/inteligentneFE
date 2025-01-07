import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiCaller } from 'src/app/shared/apiCaller';
import { ControllerNames } from 'src/app/shared/controlerNames';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  searchForm: FormGroup; 
  items: any[] = [
    // { id:1, title: 'Product 1', price: 19.99, url: 'https://placehold.jp/150x150.png' },
    // { id:2, title: 'Product 2', price: 29.99, url: 'https://placehold.jp/150x150.png' },
    // { id:3, title: 'Product 3', price: 39.99, url: 'https://placehold.jp/150x150.png' },
    // { id:4, title: 'Product 4', price: 39.99, url: 'https://placehold.jp/150x150.png' },
  ];
  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private apiCaller: ApiCaller,
    private fb: FormBuilder
    ) { 
      this.searchForm = this.fb.group({
        pageSize: 4,
      });
    }

  ngOnInit(): void {
    this.loadCart();
    this.loadRecommended();
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartArray = JSON.parse(cart);
      this.cartItems = cartArray.map((cartItem: any) => {
        return {...cartItem};
      });

      this.calculateTotal();
    }
  }
  updateQuantity(itemId: any, change: number) {
    const cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
    const itemIndex = cartArray.findIndex((item: any) => item.id === itemId);

    if (itemIndex >= 0) {
      if (cartArray[itemIndex].quantity + change > 0) {
        cartArray[itemIndex].quantity += change;
      } else {
        cartArray.splice(itemIndex, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cartArray));
      this.loadCart();
    }
  }

  removeItem(itemId: number) {
    const cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cartArray.filter((item: any) => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    this.loadCart();  
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  buyItems() {
    this.apiCaller.setControllerPath(ControllerNames.Cart);
    let ids=  this.cartItems.map(x=>x.id).join(',');
    console.log("ids", ids)

    this.apiCaller.addItem({productIds: ids}).subscribe((res:any)=>{
      console.log("ADDED", res)
      this.snackBar.open(this.translate.instant('Snackbar.Bought'), this.translate.instant('Snackbar.Close'), {
        duration: 3000,
        horizontalPosition: 'center', 
        verticalPosition: 'bottom'
      });
    })
    console.log("CARTITEMS", this.cartItems)
    return;
  }

  loadRecommended(){
    this.apiCaller.setControllerPath(ControllerNames.Product);
    this.apiCaller.getRecommendedList(this.searchForm.value).subscribe((res:any) => {
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
  
}
