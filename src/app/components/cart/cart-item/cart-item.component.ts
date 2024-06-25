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
    onRemove() {
        throw new Error('Method not implemented.');
    }
    @Input() productData: any

    constructor() {
        console.log(this.productData)
    }
}
