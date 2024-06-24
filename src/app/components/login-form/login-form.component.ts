import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
email: any;
password: any;

}
