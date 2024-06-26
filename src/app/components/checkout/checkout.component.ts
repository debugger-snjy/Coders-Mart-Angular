import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderItemComponent } from "../order-item/order-item.component";
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    templateUrl: './checkout.component.html',
    styleUrl: './checkout.component.css',
    imports: [FooterComponent, HeaderComponent, CommonModule, FormsModule, ReactiveFormsModule, OrderItemComponent]
})
export class CheckoutComponent {
    address: any;

    totalAmount: any;
    cartItems: any;
    totalBill: any;
    productData: any;
    totalCartItems: any;

    email: any;
    password: any;

    // FormGroup Variable to handle the form Data & Validation
    addressForm: FormGroup;


    // Variable to check whether the form is submitted or not
    submitted: boolean = false;

    // Constructor that will initialize the addressForm variables and have validation
    constructor(private fb: FormBuilder, private orderService: OrderService, private toast: HotToastService, private router: Router) {

        this.addressForm = this.fb.group({
            address: ['', Validators.compose([Validators.required])],
            paymentMode: ['CHEQUE']
        })

        this.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        console.log(this.cartItems)
        this.totalCartItems = this.cartItems.length

        this.totalBill = this.cartItems.reduce((bill: any, item: any) => bill + (item.productQuantity * item.productPrice), 0);
    }

    // Function that will return the value of the specific form field
    getAddressFromControl(value: string) {
        return this.addressForm.controls[value];
    }

    // Function to get all the data of the Form in the form of object
    useraddressFormControls() {
        return {
            address: this.getAddressFromControl('address'),
            paymentMode: this.getAddressFromControl('paymentMode'),
        }
    }

    placeOrder() {
        try {

            if (this.addressForm.valid) {

                // Storing the form data
                let loginUserData = { ...this.addressForm.value }

                // Printing the Form Data
                console.log("Form Data : ", loginUserData);


                // Calling the API Function to Order the Cart Items
                this.orderService.placeOrder(loginUserData.paymentMode, loginUserData.address).subscribe(
                    (res) => {
                        this.toast.success("Order Placed Successfully !!")
                        // Setting the LocalStorage For the Toast Message
                        localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `Order Placed Successfully` }))
                        localStorage.removeItem("cartItems")
                    },
                    (error) => {
                        this.toast.error("Order Not Placed Successfully")
                        // Setting the LocalStorage For the Toast Message
                    }
                )

                // Resetting the form Variables
                this.submitted = false;
                this.addressForm.reset();
                this.addressForm.controls["paymentMode"].setValue("CHEQUE")

                // Removing all the validation errors shown in the form
                Object.keys(this.addressForm.controls).forEach(key => {
                    this.addressForm.controls[key].setErrors(null)
                });

                window.location.href = "/";
            }
            else {
                this.submitted = true;
                console.log(this.addressForm.errors);
                this.toast.error("Address is Empty");
            }
        } catch (error) {
            console.log("Error : ", error);

        }
    }

    // Function to show the Toast
    showToast(type: string, msg: string) {
        if (type === "success") {
            this.toast.success(msg)
        }
        else if (type === "error") {
            this.toast.error(msg)
        }
    }

}
