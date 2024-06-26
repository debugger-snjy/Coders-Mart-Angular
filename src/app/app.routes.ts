import { Routes } from '@angular/router';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ErrorComponent } from './components/error/error.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { authGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path:'',
                component:HomeComponent,
            },
            {
                path: 'login',
                component: LoginFormComponent,
            },
            {
                path: 'product/:id',
                component: ProductDetailsComponent,
            },
            {
                path: 'signup',
                component: SignupFormComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            {
                path: 'checkout',
                canActivate:[authGuard],
                component: CheckoutComponent,
            },
            // Added Error page if any other URL is visited
            {
                path: '**',
                component: ErrorComponent
            }
        ]
    },
];