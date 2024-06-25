import { Routes } from '@angular/router';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ErrorComponent } from './components/error/error.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

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
                path: 'signup',
                component: SignupFormComponent,
            },
            {
                path: 'cart',
                component: CartComponent,
            },
            // Added Error page if any other URL is visited
            {
                path: '**',
                component: ErrorComponent
            }
        ]
    },
];