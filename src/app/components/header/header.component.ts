import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DarkThemeService } from '../../services/dark-theme.service';

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

    // Adding the Code For Theme Toggle
    isDarkMode = localStorage.getItem("isDarkMode") === "true" ? true : false;
    buttonClasses = `relative inline-flex items-center cursor-pointer px-4 py-2 ${this.isDarkMode ? 'bg-slate-950' : 'bg-gray-200'}`;

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        this.darkModeService.toggleDarkMode(this.isDarkMode);
        if (this.isDarkMode) {
            localStorage.setItem("isDarkMode", "true")
        }
        else {
            localStorage.setItem("isDarkMode", "false")
        }
    }

    updateDarkModeClass() {
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    constructor(private router: Router, private darkModeService: DarkThemeService) {

        this.cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        console.log(this.cartItems)
        this.totalItems = this.cartItems.reduce((count: any, item: any) => count + item.productQuantity, 0);
        console.log(this.totalItems)

        this.darkModeService.darkMode$.subscribe(mode => {
            this.isDarkMode = mode;
            this.updateDarkModeClass();
        });
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

        if(this.isDarkMode){
            this.updateDarkModeClass();
        }
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
