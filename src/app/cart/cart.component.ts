import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CartService } from '../cart.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();

  todayDate: Date = new Date();
  myDate = this.datepipe.transform(new Date(), 'yyyy-MM-ddThh:mm');
  // YYYY-MM-DD
  currentDate = new Date().toISOString();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
    email: '',
    dob: this.myDate,
    pw: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private datepipe: DatePipe
  ) // private mat-form: MatFormFieldModule,
  // private mat-input: MatInputModule
  {}

  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your oder has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
  ngOnInit(): void {}
}
