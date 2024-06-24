import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {


    // FormGroup Variable to handle the form Data & Validation
    registrationForm: FormGroup;

    // Variable to check whether the form is submitted or not
    submitted: boolean = false;

    // Constructor that will initialize the registrationForm variables and have validation
    constructor(private fb: FormBuilder, private userService: UserService, private toast: HotToastService, private router: Router) {
        this.registrationForm = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(5)])],
            email: ['', Validators.compose([Validators.required, Validators.email,])],
            phone: ['', Validators.compose([Validators.required, Validators.pattern(/^[789]{1}\d{9}$/g)])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)])],
            gender: ['', Validators.compose([Validators.required])],
        })

    }

    // Function that will return the value of the specific form field
    getRegistrationFromControl(value: string) {
        return this.registrationForm.controls[value];
    }

    // Function to get all the data of the Form in the form of object
    userRegistrationFormControls() {
        return {
            name: this.getRegistrationFromControl('name'),
            email: this.getRegistrationFromControl('email'),
            phone: this.getRegistrationFromControl('phone'),
            password: this.getRegistrationFromControl('password'),
            gender: this.getRegistrationFromControl('gender'),
        }
    }

    // Function to call when we submit the form
    submitForm() {
        try {
            if (this.registrationForm.valid) {

                // Storing the form data
                let registrationData = { ...this.registrationForm.value, role: "customer" }

                // Printing the Form Data
                console.log("Form Data : ", registrationData);
                // alert("Form Submitted")

                this.userService.createNewUserAPI(registrationData).subscribe(
                    (res) => {
                        console.log("API Success", res);
                        this.showToast("success", res.message);
                        this.router.navigate(['/login']);
                    },
                    (error) => {
                        this.showToast("error", error.error.msg)
                        console.log("API Error", error);
                    }
                )

                // Resetting the form Variables
                this.submitted = false;
                this.registrationForm.reset();

                // Removing all the validation errors shown in the form
                Object.keys(this.registrationForm.controls).forEach(key => {
                    this.registrationForm.controls[key].setErrors(null)
                });
            }
            else {
                this.submitted = true;
                console.log(this.registrationForm.errors);
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
