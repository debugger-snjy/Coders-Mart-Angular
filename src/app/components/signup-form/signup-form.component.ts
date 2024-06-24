import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

    registrationForm: FormGroup;
    constructor(private _formBuilder: FormBuilder) {

        // Adding default value in the FormControl parenthesis as '' and this will help to remove the null value and replace it with empty string

        // this.registrationForm = new FormGroup({
        //     id: new FormControl(''),
        //     fname: new FormControl(''),
        //     lname: new FormControl(''),
        //     email: new FormControl(''),
        //     mobno: new FormControl(''),
        // })

        // Here, we should avoid using new keywords, so modifying the above code
        // this.registrationForm = _formBuilder.group({
        //     id: new FormControl(),
        //     fname: new FormControl(),
        //     lname: new FormControl(),
        //     email: new FormControl(),
        //     mobno: new FormControl(),
        // })

        // Removing the new Keyword from the formControl as well in the above code and defining the default value in the form
        // If we have more than one validators, then we have to add them in the array, so that all validators should be in 1nd index [2 position]

        // compose function : Compose multiple validators into a single function that returns the union of the individual error maps for the provided control.
        // Also, we should use Validator.compose if we have more than 1 validator, as it will make better performance and faster validation
        this.registrationForm = _formBuilder.group({
            id: ['12', Validators.required],
            fname: ['Sanjay', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
            lname: ['Sukhwani', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            mobno: ['', Validators.compose([Validators.required, Validators.pattern('^[7-9]{3}[0-9]{7}')])],
        })

        // ? valueChanges : It will provide the value of the field or the form on every change in the fields
        // we have to subscribe to the valueChanges property
        // valueChanges will run/ call/ execute the code written in it every time when the value of fname is changes
        this.registrationForm.get('fname')?.valueChanges.subscribe(firstName => {
            console.log("Updated First Name Value : ", firstName);
        })

        // valueChanges will run/ call/ execute the code written in it every time when the value of email is changes
        this.registrationForm.get('email')?.valueChanges.subscribe(email => {
            console.log("Updated Email Address Value : ", email);
        })

        // We can do that in the whole form as well
        this.registrationForm.valueChanges.subscribe(formData => {
            console.log("Updated Form Data : ", formData);
            console.log("Updated Form Data Value For Fname : ", formData.fname);
        })

        // ? statusChanges : It will provide the status of the field or the form on every change in the fields
        // we have to subscribe to the statusChanges property
        // statusChanges will run/ call/ execute the code written in it every time when the status of fname is changes
        this.registrationForm.get('fname')?.statusChanges.subscribe(firstNameStatus => {
            console.log("First Name Validation Status : ", firstNameStatus);
        })

        // statusChanges will run/ call/ execute the code written in it every time when the status of email is changes
        this.registrationForm.get('email')?.statusChanges.subscribe(emailStatus => {
            console.log("Email Address Validation Status : ", emailStatus);
        })

        // We can do that in the whole form as well
        this.registrationForm.statusChanges.subscribe(formData => {
            console.log("Full Form Data Validation Status : ", formData);
        })

    }

    registerData(formData: FormGroup) {
        console.log("Form Data :", formData.value);
        // it will how true when all the fields are filled, otherwise false
        console.log("Form validation Status :", formData.valid);

        // we can use the formData as well as the registrationForm variable because both are same
        // Getting all the Values Separately
        console.log("First Name using formData Variable : ", formData.get('fname')?.value);
        console.log("First Name using registrationForm Variable : ", this.registrationForm.get('fname')?.value);

    }

    // Function to reset the Form : 
    resetForm() {
        this.registrationForm.reset();
    }

}
