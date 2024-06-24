import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private serverUrl = 'http://localhost:8000/v1/api';
    private productsUrl = `${this.serverUrl}/products/`;

    constructor(private http: HttpClient) { }

    fetchAllProducts(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<any[]>(this.productsUrl, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('Error fetching products:', error);
        return throwError('Something went wrong; please try again later.');
    }

}
