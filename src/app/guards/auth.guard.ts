import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

    let router = inject(Router);

    if (localStorage.getItem("token") && localStorage.getItem("token") !== null && localStorage.getItem("token")!.length > 0) {
        return true;
    }
    else {

        // Setting the LocalStorage For the Toast Message
        localStorage.setItem("toast", JSON.stringify({ type: "error", msg: `Kindly Login to Checkout !` }))

        router.navigate(["/login"]);
        return false;
    }
};
