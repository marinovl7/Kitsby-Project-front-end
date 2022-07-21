import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalComponentHome } from "./modal/modal.component";

@Injectable({
    providedIn: 'root'
})
export class ModalService {

    constructor(private modal: MatDialog) {

    }


    onOpenModal(data: string, loggedIn: boolean, withdrawalMode?: string) {
        this.modal.open(ModalComponentHome, {
            data: {
                data: data,
                loggedIn: loggedIn,
                withdrawalMode: withdrawalMode
            }

        })
    }
}