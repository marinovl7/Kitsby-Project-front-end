import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user.data.model';
import { ModalService } from '../home/modal.service';
import { RenderMyProfile } from './render.myprofile.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', './navbar.queries.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  myProfileShowed: boolean = false
  isMobile: boolean = false
  authService: AuthService
  constructor(authService: AuthService, private router: Router, private modalService: ModalService, private renderMyProfileService: RenderMyProfile, private breakpointObserver: BreakpointObserver) {
    // detect screen size changes
    this.breakpointObserver.observe([
      "(max-width: 59em)"
    ]).subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    });
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

  }


  switchToAuthComponent() {
    this.authService.mode.next('login')
    this.router.navigate(['../authentication'])
  }

  onDeposit() {
    this.modalService.onOpenModal('', this.loggedIn)
  }

  logout() {
    this.authService.logout()
  }

  showMyProfile() {
    this.myProfileShowed = !this.myProfileShowed
    this.renderMyProfileService.renderMyProfile.next(this.myProfileShowed)
  }

  openCloseNav() {
    document.querySelector('.header')?.classList.toggle('nav-open')
    document.querySelector('.header')?.classList.toggle('nav-closed')
    if (this.myProfileShowed) {
      this.myProfileShowed = !this.myProfileShowed
      this.renderMyProfileService.renderMyProfile.next(this.myProfileShowed)

    }
  }



}
