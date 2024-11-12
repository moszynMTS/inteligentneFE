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
    console.log("Details");
  }
}
