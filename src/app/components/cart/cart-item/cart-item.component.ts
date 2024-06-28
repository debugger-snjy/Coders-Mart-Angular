import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ConnectableObservable } from 'rxjs';

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

            console.log("cartitem stock : ", this.productData.productInStock)


            // Then we have to increase the quantity by 1 only
            let updatedLocalCart = localCart.map((item: any) => {
                // console.log("Check : ", (this.productData.productInStock >= item.productQuantity + 1))
                return item._id === id ?
                { ...item, productQuantity: (this.productData.productInStock >= item.productQuantity + 1) ? item.productQuantity + 1 : item.productQuantity }
                :
                item
            }
            )

            if (localStorage.getItem("token") && localStorage.getItem("user")) {
                // Calling the Database Increment Quantity API Call
                this.cartService.updateQuantityInCartItem(id, 1, "add").subscribe(
                    (res) => {
                        localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
                        window.location.reload()
                    },
                    (err) => {
                        this.toast.error("Failed to Update the Quantity !!")
                    }
                )
            }
            else {
                localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
                localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${isIncrementedItemExist.productName} Quantity Updated Successfully` }))
                window.location.reload()
            }
        }
    }

    decrementItemInCart(id: any) {
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Checking whether the item already exists in the cart or not
        const isDecrementedItemExist = localCart.find((item: any) => item._id === id) ?? false

        if (isDecrementedItemExist) {
            // Then we have to increase the quantity by 1 only
            let updatedLocalCart = localCart.map((item: any) => item._id === id ?
                { ...item, productQuantity: (item.productQuantity - 1 > 0) ? item.productQuantity - 1 : item.productQuantity }
                :
                item)

            if (localStorage.getItem("token") && localStorage.getItem("user")) {
                // Calling the Database Decrement Quantity API Call
                this.cartService.updateQuantityInCartItem(id, 1, "remove").subscribe(
                    (res) => {
                        localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
                        window.location.reload()
                    },
                    (err) => {
                        this.toast.error("Failed to Update the Quantity !!")
                    }
                )
            }
            else {
                localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
                localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${isDecrementedItemExist.productName} Quantity Updated Successfully` }))
                window.location.reload()
            }
        }
    }

    removeItemFromCart(id: any) {
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // Checking whether the item already exists in the cart or not
        const isRemovedItemExist = localCart.find((item: any) => item._id === id) ?? false

        if (isRemovedItemExist) {
            // Then we have to increase the quantity by 1 only
            let updatedLocalCart = localCart.filter((item: any) => item._id !== id)

            if (localStorage.getItem("token") && localStorage.getItem("user")) {
                // Calling the Database Decrement Quantity API Call
                this.cartService.removeItemFromCart(id).subscribe(
                    (res) => {
                        localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
                        window.location.reload()
                    },
                    (err) => {
                        this.toast.error("Failed to Remove the Product !!")
                    }
                )
            }
            else {
                localStorage.setItem("cartItems", JSON.stringify(updatedLocalCart))
                localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `${isRemovedItemExist.productName} Removed From Cart Successfully` }))
                window.location.reload()
            }
        }
    }


    onRemove() {
        this.removeItemFromCart(this.productData._id)
    }

    qty: any;
    @Input() productData: any

    constructor(private cartService: CartService, private toast: HotToastService) {
        console.log("Data:", this.productData)
        // console.log("productData.productInStock : ", this.productData.productInStock)
        // console.log("productData.productQuantity : ", this.productData.productQuantity)
        // console.log("productData.productInStock >= productData.productQuantity : ", this.productData.productInStock >= this.productData.productQuantity)
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
