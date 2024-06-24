import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  addToCart(item: any) {
    let itemsInCart = [];
    if (localStorage.getItem("cartItems") && JSON.parse(localStorage.getItem("cartItems") || "[]").length > 0) {
      itemsInCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      itemsInCart.push(item)
      console.log("Yes");

    }
    else{
      console.log("No");
      itemsInCart.push(item);
    }

    console.log("Item Added IN Cart",itemsInCart)
    localStorage.setItem("cartItems", JSON.stringify(itemsInCart))
  }
  @Input() productData: any;
}
