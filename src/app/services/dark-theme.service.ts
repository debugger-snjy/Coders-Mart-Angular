import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DarkThemeService {
    private darkModeSubject = new BehaviorSubject<boolean>(localStorage.getItem("isDarkMode") === "true" ? true : false);
    darkMode$ = this.darkModeSubject.asObservable();

    toggleDarkMode(isDarkMode: boolean) {
        this.darkModeSubject.next(isDarkMode);
    }
}
