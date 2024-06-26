import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
    totalItems = 0;
    username: any;
    user: any;
    cartItems: any;
    isUserLoggedIn: boolean = false;

    constructor(private router: Router) {

        this.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        console.log(this.cartItems)
        this.totalItems = this.cartItems.reduce((count: any, item: any) => count + item.productQuantity, 0);
        console.log(this.totalItems)
    }


    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        if (localStorage.getItem("user")) {
            this.username = JSON.parse(localStorage.getItem("user") || "{}").name;
            this.user = JSON.parse(localStorage.getItem("user") || "{}");
            console.log(this.username)
            console.log(this.user)
            this.isUserLoggedIn = true;
        }
        this.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        console.log(this.cartItems)
        this.totalItems = this.cartItems.reduce((count: any, item: any) => count + item.productQuantity, 0);
        console.log(this.totalItems)

    }

    logout() {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("cartItems")
        this.cartItems = null;
        this.user = null;
        this.username = null;
        this.isUserLoggedIn = false;

        // Setting the LocalStorage For the Toast Message
        localStorage.setItem("toast", JSON.stringify({ type: "success", msg: `Logout Successful` }))

        window.location.href = "/";
    }
}
