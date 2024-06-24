import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  totalItems = 0;
  username: any;
  user: any;
  isUserLoggedIn: boolean = false;

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (localStorage.getItem("user")) {
      this.username = JSON.parse(localStorage.getItem("user") || "{}").name;
      this.user = JSON.parse(localStorage.getItem("user") || "{}")
      console.log(this.username)
      console.log(this.user)
      this.isUserLoggedIn = true;
    }

  }

  logout() {
    localStorage.removeItem("user")
    localStorage.removeItem("token")

    this.user = null;
    this.username = null;
    this.isUserLoggedIn = false;

  }
}
