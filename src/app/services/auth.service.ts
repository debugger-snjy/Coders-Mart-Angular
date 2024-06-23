import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Exporting the Service
export class AuthService {

  constructor() { }

  // Function to Check whether the token is available in the local Storage or not
  isLoggedIn() {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== null && localStorage.getItem("token")!.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}
