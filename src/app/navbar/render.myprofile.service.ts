import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RenderMyProfile {
    renderMyProfile: BehaviorSubject<any> = new BehaviorSubject(false)




}