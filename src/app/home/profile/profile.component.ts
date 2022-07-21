import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RenderMyProfile } from 'src/app/navbar/render.myprofile.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authService: AuthService;
  loggedIn: boolean = false;
  renderMyProfile: boolean = true

  constructor(private router: Router, authService: AuthService, private renderMyProfileService: RenderMyProfile, private modalService: ModalService) {
    this.authService = authService
  }

  ngOnInit(): void {
    this.authService.loggedInUserData.subscribe(user => {
      if (user._id === '' && user.balance === 0 && user.passLevel === 0 && user.referralLink === '') {
        this.loggedIn = false
      } else {
        this.loggedIn = true
      }
    })

    this.renderMyProfileService.renderMyProfile.subscribe(value => this.renderMyProfile = value)
  }

  onSignUp() {
    this.authService.mode.next("signUp")
    this.router.navigate(['../authentication'])

  }

  logout() {
    this.renderMyProfileService.renderMyProfile.next(false)
    this.authService.logout()
  }

  onDeposit(data: string) {
    this.modalService.onOpenModal(data, this.loggedIn)

  }
  onWithdrawal(data: string) {
    this.modalService.onOpenModal(data, this.loggedIn, 'withdrawal')

  }

}
