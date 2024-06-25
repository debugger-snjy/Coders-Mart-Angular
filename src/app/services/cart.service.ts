import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private server = 'http://localhost:8000/v1/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = JSON.parse(localStorage.getItem("token") || '');
    console.log(token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addItemToCart(productID: string, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.server}/cart/`, { productID, quantity }, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  removeItemFromCart(productID: string): Observable<any> {
    return this.http.delete<any>(`${this.server}/cart/item/${productID}`, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  updateQuantityInCartItem(productID: string, quantity: number, operation: string): Observable<any> {
    return this.http.patch<any>(`${this.server}/cart/`, { productID, quantity, qtyOperation: operation }, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  getCartItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.server}/cart/`, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }

  emptyCart(): Observable<any> {
    return this.http.delete<any>(`${this.server}/cart/`, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error(error);
          return throwError(error);
        })
      );
  }
}
