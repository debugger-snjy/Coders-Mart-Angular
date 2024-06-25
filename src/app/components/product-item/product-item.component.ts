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

        if (localStorage.getItem('cartItems')) {
            itemsInCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        }

        const existingItemIndex = itemsInCart.findIndex((cartItem: any) => cartItem._id === item._id);

        if (existingItemIndex !== -1) {
            // If item exists, update the quantity
            itemsInCart[existingItemIndex].productQuantity += 1;
        } else {
            // If item does not exist, add it to the cart
            item.productQuantity = 1; // Initialize quantity to 1
            itemsInCart.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
        console.log('Item added to cart:', item);
        window.location.reload()
    }
    @Input() productData: any;
}
