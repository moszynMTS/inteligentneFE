import { Component, OnInit } from '@angular/core';
import { DetailsComponent } from '../details/details.component';

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
    { id:4, title: 'Product 3', price: 39.99 },
    { id:5, title: 'Product 3', price: 39.99 },
    { id:6, title: 'Product 3', price: 39.99 },
    { id:7, title: 'Product 3', price: 39.99 },
    { id:8, title: 'Product 3', price: 39.99 },
    { id:9, title: 'Product 3', price: 39.99 },
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
