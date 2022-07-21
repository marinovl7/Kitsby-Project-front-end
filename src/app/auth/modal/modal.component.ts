import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  userId: string = ''

  constructor(@Inject(MAT_DIALOG_DATA) private data: { userId: string }, public dialogRef: MatDialogRef<ModalComponent>, private authService: AuthService) {
    this.userId = data.userId
  }

  onCloseModal() {
    this.dialogRef.close()
    this.authService.mode.next("login")
  }

  ngOnInit(): void {

  }

}
