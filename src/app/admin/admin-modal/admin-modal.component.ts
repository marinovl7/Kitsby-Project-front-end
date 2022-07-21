import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { ModalComponent } from 'src/app/auth/modal/modal.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {
  userId: string = ''
  message: string = ""

  constructor(@Inject(MAT_DIALOG_DATA) private data: { userId: string }, public dialogRef: MatDialogRef<ModalComponent>, private adminService: AdminService) {
    this.userId = data.userId
  }

  ngOnInit(): void {
  }

  addBalance(num: NgModel) {
    if (num.value < 0) {
      this.adminService.getSingleUser(this.userId).subscribe(res => {
        let userBalance = res.balance + num.value
        if (userBalance < 0) {
          this.message = `FAILED:The user balance can not be negative`
          document.querySelector('.message')?.classList.add('invalid')

        } else {
          this.addBalanceObservable(num)
        }
      })
    } else {

      this.addBalanceObservable(num)
    }

  }
  addPassLvl(passLvl: NgModel) {
    if (passLvl.value <= 3 && passLvl.value >= -1) {
      this.adminService.addPassLvl(this.userId, passLvl.value).subscribe(res => {
        this.message = `Successfully added ${passLvl.value} to the user`
      }, err => {
        this.message = `Something went wrong, try again later`
      })
    } else {
      {
        this.message = `FAILED:The passLvL should be within the range [-1;3].`
      }
    }
  }
  deleteUser() {
    if (this.userId !== '62c1d0700f3b6f723e3a7f02') {

      this.adminService.deleteUser(this.userId).subscribe(res => {
        this.message = 'Successfully deleted the user refresh the page to see the new table'
      })
      setInterval(() => {
        this.dialogRef.close()
      }, 2000)

    }
  }

  addBalanceObservable(num: NgModel) {
    this.adminService.addBalance(this.userId, num.value).subscribe(res => {
      this.message = `Successfully added ${num.value} to the user`
    }, err => {
      this.message = `Something went wrong, try again later`
    })
  }

}
