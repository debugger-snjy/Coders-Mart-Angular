import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-product-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-item.component.html',
    styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
    addToCart() {
        throw new Error('Method not implemented.');
    }
    @Input() productData: any;
}
