import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cart-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart-item.component.html',
    styleUrl: './cart-item.component.css'
})
export class CartItemComponent {


    incrementItemInCart(id: any) {
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Checking whether the item already exists in the cart or not
        const isIncrementedItemExist = localCart.find((item: any) => item._id === id) ?? false

        if (isIncrementedItemExist) {
            // Then we have to increase the quantity by 1 only
            let updatedLocalCart = localCart.map((item: any) => item._id === id ? { ...item, productQuantity: item.productQuantity + 1 } : item)

            localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
            window.location.reload()
        }
    }

    decrementItemInCart(id: any) {
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Checking whether the item already exists in the cart or not
        const isIncrementedItemExist = localCart.find((item: any) => item._id === id) ?? false

        if (isIncrementedItemExist) {
            // Then we have to increase the quantity by 1 only
            let updatedLocalCart = localCart.map((item: any) => item._id === id ? { ...item, productQuantity: item.productQuantity - 1 } : item)

            localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
            window.location.reload()
        }
    }

    removeItemFromCart(id:any){
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Checking whether the item already exists in the cart or not
        const isRemovedItemExist = localCart.find((item: any) => item._id === id) ?? false

        if (isRemovedItemExist) {
            // Then we have to increase the quantity by 1 only
            let updatedLocalCart = localCart.filter((item:any) => item._id !== id)

            localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
            window.location.reload()
        }
    }


    onRemove() {
        this.removeItemFromCart(this.productData._id)
    }
    qty: any;
    @Input() productData: any

    constructor() {
        console.log("Data:", this.productData)
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.qty = this.productData.productQuantity;
    }

    increaseQty() {
        this.productData.productQuantity++;
        this.incrementItemInCart(this.productData._id)
        this.qty++;
    }
    decreaseQty() {
        if (this.productData.productQuantity > 1) {
            this.productData.productQuantity--;
            this.decrementItemInCart(this.productData._id)
            this.qty--;
        }
    }
}
