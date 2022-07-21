import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponentHome implements OnInit {
  loggedIn: boolean = false;
  vipPass: string = ''
  withdrawalMode: string | undefined

  constructor(@Inject(MAT_DIALOG_DATA) private data: { data: string, loggedIn: boolean, withdrawalMode: string | undefined }, public dialogRef: MatDialogRef<ModalComponentHome>) {
    this.loggedIn = data.loggedIn
    this.vipPass = data.data
    this.withdrawalMode = data.withdrawalMode


  }

  ngOnInit(): void {

  }

  closeModal() {
    this.dialogRef.close()
  }

}
