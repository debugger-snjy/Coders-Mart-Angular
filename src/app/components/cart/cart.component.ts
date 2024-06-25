import { Component } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-cart',
    standalone: true,
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.css',
    imports: [CartItemComponent, RouterLink, CommonModule, HeaderComponent, FooterComponent]
})
export class CartComponent {
    totalAmount: any;
    cartItems: any;
    isViewAll: any;
    toggleViewAll() {
        throw new Error('Method not implemented.');
    }
    totalBill: any;
    productData: any;
    totalCartItems: any;

    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        console.log(this.cartItems)
        this.totalCartItems = this.cartItems.length

        this.totalBill = this.cartItems.reduce((bill: any, item: any) => bill + (item.productQuantity * item.productPrice), 0);
    }
}
