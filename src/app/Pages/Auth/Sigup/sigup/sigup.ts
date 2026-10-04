import { Component , signal } from '@angular/core';
import { Authentication } from '../../../../Service/Auth/authentication';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageModalService } from '../../../../shared/message-modal.service';

@Component({
  selector: 'app-sigup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sigup.html',
  styleUrl: './sigup.css',
})
export class Sigup {
  SigupDto: any = {
    Username: '',
    Email: '',
    Password: '',
  }

  EmailVerfy = signal<boolean>(false);
  Isloading= signal<boolean>(false);

  OTP:string = '';

constructor(private authService: Authentication, private messageModal:MessageModalService) {}


Sigup(SigupDto: any) {
  this.Isloading.set(true);
  this.authService.Signup(SigupDto).subscribe(
    (response: any) => {
      console.log('Signup successful:', response);
      this.messageModal.show(response?.message)
      this.Isloading.set(false);
      this.EmailVerfy.set(true);
      
    },
    (error: any) => {
      console.error('Signup failed:', error);
      this.messageModal.show(error?.error?.message)
      this.Isloading.set(false);
    }
  );  
}

VerfyEmail(OTP: string,Email:string) {
  this.Isloading.set(true);
  this.authService.VerfyEmail(OTP,Email).subscribe(
    (response: any) => {
      console.log('Email verification successful:', response);
      
      this.authService.SaveToken(response.token);
      
      this.EmailVerfy.set(false);
      this.Isloading.set(false);
      window.location.reload();
      // Handle successful email verification, e.g., navigate to login page
    },
    (error: any) => {
      console.error('Email verification failed:', error);
      this.messageModal.show(error?.error?.message)
      this.Isloading.set(false);
    }
  );
}

ResendOTP(Email:string)
{
  this.Isloading.set(true);
  this.authService.ResendOtp(Email).subscribe(
    (response: any) => {
      console.log('OTP resend successful:', response);
      this.messageModal.show(response?.message)
      this.Isloading.set(false);
      // Handle successful OTP resend, e.g., show a success message
    },
    (error: any) => {
      console.error('OTP resend failed:', error);
      this.messageModal.show(error?.error?.message)
      this.Isloading.set(false);
    }
  );
}

}
