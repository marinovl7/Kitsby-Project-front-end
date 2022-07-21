import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../home/modal.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', './footer.queries.css']
})
export class FooterComponent implements OnInit {
  loggedIn: boolean = false

  constructor(private authService: AuthService, private router: Router, private modalService: ModalService) { }

  ngOnInit(): void {
    this.authService.loggedInUserData.subscribe(user => {
      if (user._id === '' && user.balance === 0 && user.passLevel === 0 && user.referralLink === '') {
        this.loggedIn = false
      } else {
        this.loggedIn = true
      }
    })
  }

  onDeposit() {
    this.modalService.onOpenModal('', this.loggedIn)
  }

  onLogin() {
    this.authService.mode.next('login')
    this.router.navigate(['../authentication'])
  }

  onSignup() {
    this.authService.mode.next('signUp')
    this.router.navigate(['../authentication'])
  }

  goToTermsAndConditions() {

    this.router.navigate(['../terms-and-conditions'])
  }

}
