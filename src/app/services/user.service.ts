import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private serverUrl = 'http://localhost:8000/v1/api';

    constructor(private http: HttpClient) { }

    createNewUserAPI(userData: any): Observable<any> {
        return this.http.post<any>(`${this.serverUrl}/user/register`, userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    loginUserAPI(userLoginData: any): Observable<any> {
        return this.http.post<any>(`${this.serverUrl}/user/login`, userLoginData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    logoutUserAPI(): Observable<any> {
        return this.http.post<any>(`${this.serverUrl}/user/logout`, {}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
