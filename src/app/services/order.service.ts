import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private server = 'http://localhost:8000/v1/api'; // Replace with your server URL

    constructor(private http: HttpClient) { }


    placeOrder(paymentMode: string, address: string): Observable<any> {
        const url = `${this.server}/order/`;
        const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token') || "[]") : null;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const body = { paymentMode, address };

        return this.http.post<any>(url, body, { headers }).pipe(
            catchError(error => {
                console.error('Error placing order:', error);
                return throwError(error);
            })
        );
    }

}
