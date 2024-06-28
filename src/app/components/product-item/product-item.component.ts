import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-product-item',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

    @Input() productData: any;

    constructor(private cartService: CartService, private toast: HotToastService) {

    }

    isInCart(productId: string): boolean {
        return (localStorage.getItem("cartItems") && JSON.parse(localStorage.getItem("cartItems") || '[]').find((item: any) => item._id === productId)) ? true : false;
    }

    async addToCart(item: any) {
        let itemsInCart = [];

        if (localStorage.getItem('cartItems')) {
            itemsInCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        }

        const existingItemIndex = itemsInCart.findIndex((cartItem: any) => cartItem._id === item._id);

        if (existingItemIndex !== -1) {
            // If item exists, update the quantity
            itemsInCart[existingItemIndex].productQuantity += this.qty;

        } else {
            // If item does not exist, add it to the cart
            item.productQuantity = 1; // Initialize quantity to 1
            itemsInCart.push({ ...item, productQuantity: this.qty });
        }

        console.log("Check 1", item);

        if (localStorage.getItem("token") || localStorage.getItem("user")) {
            try {
                const res = await this.addItemToCartAsync(item._id, this.qty);
                // No Meaning for that !!
                this.qty > 1 ? this.toast.success(`${this.qty} ${item.productName} are Added to Your Cart & Saved`) : this.toast.success(`${this.qty} ${item.productName} is Added to Your Cart & Saved`)

                console.log("Name : ", item.productName)

                // Setting the LocalStorage For the Toast Message
                localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${this.qty} ${item.productName} Added to Your Cart` }))

                console.log("Check 2");

                localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
                console.log('Item added to cart:', item);

                window.location.reload();

            } catch (error) {
                // No Meaning for that !!
                this.qty > 1 ? this.toast.success(`${this.qty} ${item.productName} are Failed to Add in Your Cart`) : this.toast.success(`${this.qty} ${item.productName} is Failed to Add in Your Cart`)
            }
        }
        else {

            console.log("Name : ", item)

            // Setting the LocalStorage For the Toast Message
            localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${this.qty} ${item.productName} Added to Your Cart` }))

            console.log("Check 2");

            localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
            console.log('Item added to cart:', item);

            window.location.reload();
        }
    }

    qty: any = 1;

    increaseQty() {
        this.qty++;
    }
    decreaseQty() {
        if (this.qty > 1) {
            this.qty--;
        }
    }

    // Helper function to convert observable to promise
    addItemToCartAsync(itemId: string, quantity: number): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cartService.addItemToCart(itemId, quantity).subscribe(
                (res) => resolve(res),
                (err) => reject(err)
            );
        });
    }

    // Helper function to convert observable to promise
    removeItemFromCartAsync(itemId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.cartService.removeItemFromCart(itemId).subscribe(
                (res) => resolve(res),
                (err) => reject(err)
            );
        });
    }

    async removeFromCart(item: any) {
        let itemsInCart = [];

        if (localStorage.getItem('cartItems')) {
            itemsInCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
        }

        const existingItemIndex = itemsInCart.findIndex((cartItem: any) => cartItem._id === item._id);

        if (existingItemIndex !== -1) {
            // If item exists, update the quantity
            itemsInCart = itemsInCart.filter((cartItem: any) => cartItem._id !== item._id)

        } else {
        }

        console.log("Check 1", item);

        if (localStorage.getItem("token") || localStorage.getItem("user")) {
            try {

                const res = await this.removeItemFromCartAsync(item._id);

                // Setting the LocalStorage For the Toast Message
                localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${this.qty} ${item.productName} Removed From Your Cart` }))

                console.log("Check 2");

                localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
                console.log('Item Removed From cart:', item);

                window.location.reload();

            } catch (error) {
            }
        }
        else {

            console.log("Name : ", item)

            // Setting the LocalStorage For the Toast Message
            localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${this.qty} ${item.productName} Removed From Your Cart` }))

            console.log("Check 2");

            localStorage.setItem('cartItems', JSON.stringify(itemsInCart));
            console.log('Item Removed From cart:', item);

            window.location.reload();
        }
    }
}
