import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private serverUrl = 'http://localhost:8000/v1/api';
    private productsFetchUrl = `${this.serverUrl}/products/`;
    private productsAddUrl = `${this.serverUrl}/products/add`;

    constructor(private http: HttpClient) { }

    fetchAllProducts(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<any[]>(this.productsFetchUrl, { headers }).pipe(
            map(response => {
                console.log(response);
                return response;
            }),
            catchError(this.handleError)
        );
    }

    fetchSingleProduct(id: any): Observable<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.get<any[]>(this.productsFetchUrl + id, { headers }).pipe(
            map(response => {
                console.log(response);
                return response;
            }),
            catchError(this.handleError)
        );
    }

    addAllProducts(): Observable<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });

        return this.http.post<any[]>(this.productsAddUrl, { headers }).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('Error fetching products:', error);
        return throwError('Something went wrong; please try again later.');
    }

}


