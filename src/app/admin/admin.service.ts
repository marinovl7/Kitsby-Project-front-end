import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { UserDataModel } from "./user.data.model";

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }


    getAllUsers() {
        return this.http.get<UserDataModel[]>(`${environment.apiLink}/user/getAllUsers`)
    }
    addBalance(userId: string, balance: number) {
        return this.http.post(`${environment.apiLink}/user/addBalance`, {

            userId: userId,
            balance: balance

        })

    }
    addPassLvl(userId: string, passLvl: number) {
        return this.http.put(`${environment.apiLink}/user/addPassLevel`, {

            userId: userId,
            passLevel: passLvl

        })
    }
    deleteUser(userId: String) {
        return this.http.delete(`${environment.apiLink}/user/deleteUser/${userId}`)
    }

    getSingleUser(userId: string) {
        return this.http.get<UserDataModel>(`${environment.apiLink}/user/getSingleUser/${userId}`)
    }
}