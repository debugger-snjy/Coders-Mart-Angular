import { Component } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from '../../services/product.service';
import { HotToastService, Toast } from '@ngxpert/hot-toast';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ProductItemComponent]
})
export class HomeComponent {
    products: any = [];
    addDummyProducts: any;

    constructor(private productService: ProductService, private toast: HotToastService) {

    }

    ngOnInit(): void {
        console.log("Hello")
        this.productService.fetchAllProducts().subscribe(
            (res) => {
                console.log("API Success", res);
                this.showToast("success", "fetched Products");
                this.products = res;
                this.products = this.products.data.products;
                console.log(this.products)
                // this.router.navigate(['/login']);
            },
            (error) => {
                this.showToast("error", error.error.msg)
                console.log("API Error", error);
            }
        )
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
