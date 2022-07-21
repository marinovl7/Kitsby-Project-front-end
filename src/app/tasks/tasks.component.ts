import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDataModel } from '../admin/user.data.model';
import { AuthService } from '../auth/auth.service';
import { UserData } from '../auth/user.data.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  data?: UserData
  tasks: { id: number, name: string, money: number, icon: string, difficulty: number, description: string }[] = []
  tasksDone: boolean = false
  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.loggedInUserData.subscribe(res => {
      this.data = res
      console.log(this.tasksDone);
      if (this.tasks.length === 0 && !this.tasksDone) {

        switch (this.data.passLevel) {
          case 0: {
            this.tasks = [{ id: 0, name: 'Running', money: 0.6, icon: 'run_circle', difficulty: 4, description: 'Run 2km' }, { id: 1, name: 'Cooking', money: 0.7, icon: 'outdoor_grill', difficulty: 3, description: 'Cook scrambled eggs' }, { id: 2, name: 'Cleaning', money: 0.65, icon: 'cleaning_services', difficulty: 2, description: 'Clean your room' }, { id: 3, name: 'Cleaning', money: 0.75, icon: 'cleaning_services', difficulty: 3, description: 'Clean someone other room' }]
            break;
          }
          case 1: {
            this.tasks = [{ id: 0, name: 'Running', money: 1.5, icon: 'run_circle', difficulty: 3, description: 'Run 1.5km' }, { id: 1, name: 'Cooking', money: 2.00, icon: 'outdoor_grill', difficulty: 3, description: 'Cook scrambled eggs' }, { id: 2, name: 'Cleaning', money: 2.15, icon: 'cleaning_services', difficulty: 3, description: 'Clean your room' }, { id: 3, name: 'Cleaning', money: 1.75, icon: 'cleaning_services', difficulty: 3, description: 'Clean someone other room' }]
            break;
          }
          case 2: {
            this.tasks = [{ id: 0, name: 'Running', money: 5.15, icon: 'run_circle', difficulty: 3, description: 'Run 1km' }, { id: 1, name: 'Cooking', money: 7.00, icon: 'outdoor_grill', difficulty: 3, description: 'Cook scrambled eggs' }, { id: 2, name: 'Cleaning', money: 5.6, icon: 'cleaning_services', difficulty: 3, description: 'Clean your room' }, { id: 3, name: 'Cleaning', money: 6.25, icon: 'cleaning_services', difficulty: 3, description: 'Clean someone other room' }]
            break;
          } case 3: {
            this.tasks = [{ id: 0, name: 'Running', money: 15.15, icon: 'run_circle', difficulty: 3, description: 'Run 1km' }, { id: 1, name: 'Cooking', money: 17.00, icon: 'outdoor_grill', difficulty: 3, description: 'Cook scrambled eggs' }, { id: 2, name: 'Cleaning', money: 15.6, icon: 'cleaning_services', difficulty: 3, description: 'Clean your room' }, { id: 3, name: 'Cleaning', money: 16.25, icon: 'cleaning_services', difficulty: 3, description: 'Clean someone other room' }]
            break;
          }

        }
      }
    })
  }


  onTaskCompleted(id: number) {
    this.http.post<UserDataModel>(`${environment.apiLink}/user/addBalance`, {

      userId: this.data?._id,
      balance: this.tasks.filter(task => task.id === id)[0].money

    }).subscribe(res => {
      this.http.get<UserData>(`${environment.apiLink}/user/getSingleUser/${this.data?._id}`).subscribe(res => {
        this.tasks = this.tasks.filter(task => task.id !== id)
        if (this.tasks.length === 0) {
          this.tasksDone = true
        }
        this.authService.loggedInUserData.next(res)
      })
    })
  }




}
