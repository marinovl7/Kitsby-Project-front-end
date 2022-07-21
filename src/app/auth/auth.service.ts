import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { UserData } from "./user.data.model";
import { environment } from "src/environments/environment";

import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    mode: BehaviorSubject<string> = new BehaviorSubject('login')
    loggedInUserData: BehaviorSubject<UserData> = new BehaviorSubject(new UserData('', 0, 0, ''))
    private tokenExpirationTimer: any
    //auto Logout in 3 hours
    tokenExpirationTime: number = 1080000

    constructor(private http: HttpClient, private router: Router) { }


    signUp(email: string, password: string, referralLink?: string) {
        const newUser = referralLink ? {
            email: email,
            password: password,
            userReferralLink: referralLink
        } : {
            email: email,
            password: password,
            userReferralLink: "notValid"
        }
        return this.http.post<User>(`${environment.apiLink}/user/signup`, newUser)

    }

    login(userId: string, password: string) {
        return this.http.post<User>(`${environment.apiLink}/user/login`, {
            userId: userId,
            password: password
        })
    }





    autoLogin() {
        const userDataString: string | null = localStorage.getItem('userData')
        let userData: UserData | undefined
        if (userDataString) {
            userData = JSON.parse(userDataString)
        }
        if (!userData) {
            return;
        }



        this.getUser(userData._id).subscribe(user => {
            this.loggedInUserData.next(new UserData(user._id, user.balance, user.passLevel, user.referralLink))
        })


        this.autoLogout(this.tokenExpirationTime)



    }

    getUser(userId: string) {
        return this.http.get<UserData>(`${environment.apiLink}/user/getSingleUser/${userId}`)
    }


    logout() {
        this.loggedInUserData.next(new UserData('', 0, 0, ''))
        localStorage.removeItem('userData')
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['../authentication'])

    }


    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()

        }, expirationDuration)
    }


}