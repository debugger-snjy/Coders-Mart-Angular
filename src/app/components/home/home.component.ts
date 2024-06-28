import { Component } from '@angular/core';
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductService } from '../../services/product.service';
import { HotToastService, Toast } from '@ngxpert/hot-toast';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { DisplayToastService } from '../../services/display-toast.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ProductItemComponent, FooterComponent, HeaderComponent]
})
export class HomeComponent {
    products: any = [];
    loading = true;

    constructor(private productService: ProductService, private toast: HotToastService, private toastService: DisplayToastService) {
        this.toastService.showMessage()
    }

    ngOnInit(): void {
        console.log("Hello")
        this.productService.fetchAllProducts().subscribe(
            (res) => {
                console.log("API Success", res);
                this.products = res;
                this.products = this.products.data.products;
                console.log(this.products);

                const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
                if (cartItems.length > 0) {
                    let updatedCart = cartItems.map((cartItem: any) => {
                        console.log("CHECK: ", cartItem)
                        console.log("CHECK STOCK : ", cartItem.productInStock)
                        const cartProduct = this.products.filter((product: any) => (product._id === cartItem._id))
                        console.log("CHECK: ", cartProduct);
                        console.log("CHECK STOCK : ", cartProduct[0].productInStock);

                        if (cartProduct[0].productInStock) {
                            localStorage.setItem("productStockOut", "true")
                        }

                        return { ...cartItem, productInStock: cartProduct[0].productInStock }
                    });

                    console.log("CHECK:", updatedCart)

                    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                }

                this.loading = false;
            },
            (error) => {
                this.loading = false;
                this.showToast("error", error.error.msg);
                console.log("API Error", error);
            }
        );

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

    addDummyProducts() {
        this.productService.addAllProducts().subscribe(
            (res) => {
                this.toast.success("Dummy Products Added")
            }
        )
    }
}
