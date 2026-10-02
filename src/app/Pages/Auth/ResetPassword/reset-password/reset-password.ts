import { Component , signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../../../Service/Auth/authentication';
import { RouterLink } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

    ResetPasswordDto: any = {
    Email: '',
  };
OTP :string ='';
ToEmail = signal(false);
Isloading = signal(false); 

  constructor(private authService: Authentication, private router: Router) {}

  ResetPassword(ResetPasswordDto: any) {

this.Isloading.set(true);
    this.authService.ResetPassword(ResetPasswordDto.Email).subscribe(
      (response: any) => {
        console.log(response)
        this.Isloading.set(false);
        alert(response.message)
        this.ToEmail.set(true);

      },
     (err:any)=>
     {
      console.log(err);
      alert(err.err.message);
      this.Isloading.set(false);
     } 
    );

  }

  OtpVerfy(OTP:string,Email:string)
  {
    this.Isloading.set(true)
    this.authService.VerfyEmail(OTP,Email).subscribe(
      (res:any)=>
      {
          console.log(res)
          alert(res.message);
          this.authService.SaveToken(res.token);
          this.ToEmail.set(false);
          this.Isloading.set(false);
          this.router.navigate(['/changepassword']);
      },
      (err:any)=>
      {
          console.log(err)
          alert(err.error.message)
          this.Isloading.set(false);

      }
    )
  }

}
