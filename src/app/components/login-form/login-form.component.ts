import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent]
})
export class LoginFormComponent {

  email: any;
  password: any;

  // FormGroup Variable to handle the form Data & Validation
  loginForm: FormGroup;


  // Variable to check whether the form is submitted or not
  submitted: boolean = false;

  // Constructor that will initialize the loginForm variables and have validation
  constructor(private fb: FormBuilder, private userService: UserService, private cartService: CartService, private toast: HotToastService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email,])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  // Function that will return the value of the specific form field
  getLoginFromControl(value: string) {
    return this.loginForm.controls[value];
  }

  // Function to get all the data of the Form in the form of object
  userLoginFormControls() {
    return {
      email: this.getLoginFromControl('email'),
      password: this.getLoginFromControl('password'),
    }
  }


  async addItemsToCart(allCartItems: any[]) {
    for (const item of allCartItems) {
      try {
        const res = await this.addItemToCartAsync(item._id, item.productQuantity);
        this.toast.success("Item Saved in Cart");
      } catch (error) {
        console.error("Error adding item to cart", error);
      }
    }
  }

  // Helper function to convert observable to promise
  addItemToCartAsync(itemId: string, quantity: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cartService.addItemToCart(itemId, quantity).subscribe(
        (res) => resolve(res),
        (err) => reject(err)
      );
    });
  }


  // Function to call when we submit the form
  submitForm() {
    try {
      if (this.loginForm.valid) {

        // Storing the form data
        let loginUserData = { ...this.loginForm.value }

        // Printing the Form Data
        console.log("Form Data : ", loginUserData);

        // alert("Form Submitted")

        this.userService.loginUserAPI(loginUserData).subscribe(
          async (res) => {
            console.log("API Success", res);
            this.showToast("success", res.message);

            console.log("Data : ", res.data.user)

            // For Adding the Data in the Database
            const allCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

            console.log(allCartItems)

            // Saving the Token in the localStorage and Getting the Cart Items
            localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem("token", JSON.stringify(res.data.token))


            // Call the function to add all cart items
            await this.addItemsToCart(allCartItems);

            // Getting the Cart Items
            this.cartService.getCartItems().subscribe(
              (res) => {
                console.log(res)
                let cartItems: any = res;
                cartItems = cartItems.data ?? [];

                let allCartItems = cartItems.userCart[0].cartItems.map((item: any) => {
                  console.log(item)
                  return {
                    "_id": item.itemID,
                    "productName": item.itemName,
                    "productDescription": item.itemDescription,
                    "productPrice": item.itemPrice,
                    "productImage": item.itemImage,
                    "productInStock": item.itemInStock,
                    "productQuantity": item.quantity
                  }
                })

                localStorage.setItem("cartItems", JSON.stringify(allCartItems))
              },
              (err) => {
                this.toast.error("Failed to Fetch Your Cart Items")
              }
            )

            this.router.navigate(["/"])
          },
          (error) => {
            this.showToast("error", error.error.message)
            console.log("API Error", error);
          }
        )

        // Resetting the form Variables
        this.submitted = false;
        this.loginForm.reset();

        // Removing all the validation errors shown in the form
        Object.keys(this.loginForm.controls).forEach(key => {
          this.loginForm.controls[key].setErrors(null)
        });

        // window.location.reload();
      }
      else {
        this.submitted = true;
        console.log(this.loginForm.errors);
      }
    } catch (error) {
      console.log("Error : ", error);

    }
  }

  // Variable to hide the Eye Icon in Password Field
  hide = true;

  // Function to show thw password
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.preventDefault();
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
