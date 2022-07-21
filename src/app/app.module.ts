import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconModule } from "@angular/material/icon"
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './auth/modal/modal.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { ModalComponentHome } from './home/modal/modal.component';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './home/profile/profile.component';
import { TermsComponent } from './terms/terms.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component'
import { MatTableModule } from '@angular/material/table';
import { AdminModalComponent } from './admin/admin-modal/admin-modal.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    NavbarComponent,
    ModalComponent,
    ModalComponentHome,
    FooterComponent,
    ProfileComponent,
    TermsComponent,
    ErrorComponent,
    AdminComponent,
    AdminModalComponent,
    TasksComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
