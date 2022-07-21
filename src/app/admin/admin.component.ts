import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { AdminService } from './admin.service';
import { UserDataModel } from './user.data.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  allUsers: UserDataModel[] = []
  adminService: AdminService
  displayedColumns: String[] = ['userId', 'balance', 'VIPPassLevel', 'ReferralLink', 'SignedUpreferralLink', 'email', 'Action']
  loading: boolean = false
  constructor(adminService: AdminService, private modal: MatDialog) {
    this.adminService = adminService
  }

  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllUsers().subscribe(res => {
      this.allUsers = res
      this.loading = false
    })
  }

  onAction(user: UserDataModel) {
    this.modal.open(AdminModalComponent, {
      data: {
        userId: user._id
      }
    })
  }



}
