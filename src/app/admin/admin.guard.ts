import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";


@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return this.authService.loggedInUserData.pipe(map(user => {
            if (this.authService.loggedInUserData.getValue()._id === '62c1d0700f3b6f723e3a7f02') {
                return true
            }
            return this.router.createUrlTree(['../home'])
        }

        ))
    }

}