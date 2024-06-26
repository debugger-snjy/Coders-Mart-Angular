import { Injectable } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Injectable({
    providedIn: 'root'
})
export class DisplayToastService {

    constructor(private toast: HotToastService) { }

    showMessage() {
        const data = JSON.parse(localStorage.getItem("toast") || "{}")

        if (data) {
            if (data.type && data.type === "success") {
                this.toast.success(data.msg)
            }
            else if (data.type && data.type === "error") {
                this.toast.error(data.msg)
            }
            localStorage.removeItem("toast");
        }
    }
}
