import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { ModalService } from './modal.service';
import { VipPass } from './vip.pass.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.queries.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean = false;
  authService: AuthService;
  vipPasses: VipPass[] = [new VipPass(2, 4, 0.25, 0.75, 30, 'Level 1(Hard)'), new VipPass(4, 6, 1.25, 2.75, 100, 'Level 2(Medium)'), new VipPass(6, 10, 3.25, 5.55, 250, 'Level 3(Easy)'), new VipPass(10, 15, 10.25, 15.75, 500, 'Level 4(Super Easy)')]


  constructor(authService: AuthService,
    private router: Router, private modalService: ModalService,
  ) {
    this.authService = authService
  }

  ngOnInit(): void {
    const faders = document.querySelectorAll('.fade-in')
    const sliders = document.querySelectorAll('.slide-in')
    const appearOptions = {
      threshold: 0,
      rootMargin: '-150px 0px 0px 0px'
    }
    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return
        } else {
          entry.target.classList.add('appear')
          appearOnScroll.unobserve(entry.target)
        }
      })
    }, appearOptions)


    faders.forEach(fader => {
      appearOnScroll.observe(fader)
    })


    sliders.forEach(slider => {
      appearOnScroll.observe(slider)
    })

    this.authService.loggedInUserData.subscribe(user => {
      if (user._id === '' && user.balance === 0 && user.passLevel === 0 && user.referralLink === '') {
        this.loggedIn = false
      } else {
        this.loggedIn = true
      }
    })
  }


  onDeposit(data: string) {
    this.modalService.onOpenModal(data, this.loggedIn)

  }

  onSignUp() {
    this.authService.mode.next("signUp")
    this.router.navigate(['../authentication'])
  }





}
