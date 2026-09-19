import { Component , signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../../../Service/Auth/authentication';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {

ChangePasswordDto: any = {
    Password: '',
    ConfirmPassword: ''
  }

  Isloading =signal<boolean>(false);

constructor(private authService: Authentication) {}



ChangePassword(newPassword: string)
{   
      this.Isloading.set(true);
      if(newPassword !== this.ChangePasswordDto.ConfirmPassword)
      {
        alert("Password and Confirm Password do not match");
        this.Isloading.set(false);
        return;
      }
       this.authService.ChangePassword(newPassword).subscribe({
        next: (response: any) => {
          console.log(response);
          alert(response.message);
          this.Isloading.set(false);
        },
        error : (err: any) => {
          console.log(err.err);
          alert(err.error.message);
          this.Isloading.set(false);
        }
       });
  }
}
