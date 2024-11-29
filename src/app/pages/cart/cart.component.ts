import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartArray = JSON.parse(cart);
      this.cartItems = cartArray.map((cartItem: any) => {
        return { id: cartItem. id, quantity: cartItem.quantity, price: cartItem.price, title: cartItem.title };
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
    this.snackBar.open(this.translate.instant('Snackbar.Bought'), this.translate.instant('Snackbar.Close'), {
      duration: 3000,
      horizontalPosition: 'center', 
      verticalPosition: 'bottom'
    });

    console.log('Items will be bought!');
  }
}
