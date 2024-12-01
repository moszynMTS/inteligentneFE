import { Component, OnInit } from '@angular/core';
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

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private apiCaller: ApiCaller
    ) { }

  ngOnInit(): void {
    this.loadCart();
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
    this.apiCaller.setControllerPath(ControllerNames.Product);
    console.log("CARTITEMS", this.cartItems)
    return;
    this.apiCaller.addItem(this.cartItems).subscribe((res:any)=>{
      console.log("ADDED", res)
      this.snackBar.open(this.translate.instant('Snackbar.Bought'), this.translate.instant('Snackbar.Close'), {
        duration: 3000,
        horizontalPosition: 'center', 
        verticalPosition: 'bottom'
      });
    })
  }
}
