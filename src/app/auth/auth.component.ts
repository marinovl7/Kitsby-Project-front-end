import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ModalComponent } from './modal/modal.component';
import { UserData } from './user.data.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css', './auth.queries.css']
})
export class AuthComponent implements OnInit {
  loginMode = false;
  errorMessageSignUp: string = '';
  errorMessageLogin: string = '';
  loading: boolean = false;
  @ViewChild('inputFieldUsername') inputFieldUsername!: ElementRef;
  @ViewChild('inputFieldPassword') inputFieldPassword!: ElementRef;

  constructor(private authService: AuthService, private modal: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.authService.mode.subscribe(mode => {
      if (mode === 'signUp') {
        this.loginMode = false
      } else {
        this.loginMode = true;
      }
    })
  }


  switchToLogin() {
    this.authService.mode.next('login')

  }
  switchToSignUp() {
    this.authService.mode.next('signUp')

  }

  onLogin(form: NgForm) {
    this.loading = true;
    this.authService.login(form.value.userId, form.value.password).subscribe(res => {
      this.loading = false
      this.errorMessageLogin = ''
      this.inputFieldPassword.nativeElement.classList.remove('invalid')
      this.inputFieldUsername.nativeElement.classList.remove('invalid')
      form.reset()
      this.authService.getUser(res.userId).subscribe(user => {
        this.authService.loggedInUserData.next({
          _id: user._id,
          balance: user.balance,
          passLevel: user.passLevel,
          referralLink: user.referralLink

        });

        localStorage.setItem('userData', JSON.stringify(this.authService.loggedInUserData.value))

        this.authService.autoLogout(this.authService.tokenExpirationTime)
      })
      this.router.navigate(['../home'])

    }, err => {
      if (err.error.msg === "Invalid user id") {
        this.errorMessageLogin = "Wrong username"
        this.inputFieldUsername.nativeElement.classList.add('invalid')

      } else {
        this.errorMessageLogin = "Wrong password"
        this.inputFieldPassword.nativeElement.classList.add('invalid')
        if (this.inputFieldUsername.nativeElement.classList.contains('invalid')) {

          this.inputFieldUsername.nativeElement.classList.remove('invalid')
        }
      }
      this.loading = false
    })

  }

  onSignup(form: NgForm) {
    this.loading = true

    this.authService.signUp(form.value.email, form.value.password, form.value?.referralLink).
      subscribe(res => {

        this.modal.open(ModalComponent, {
          data: {
            userId: res.userId
          }
        })
        this.loading = false
        this.errorMessageSignUp = ''
        form.reset()
      },
        err => {
          this.errorMessageSignUp = err.error.msg
          this.loading = false


        })

  }




}
