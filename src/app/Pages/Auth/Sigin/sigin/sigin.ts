import { Component, signal } from '@angular/core';

import { Authentication } from '../../../../Service/Auth/authentication';

import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MessageModalService } from '../../../../shared/message-modal.service';

@Component({
  selector: 'app-sigin',

  imports: [
    RouterLink,
    CommonModule,
    FormsModule
  ],

  templateUrl: './sigin.html',

  styleUrl: './sigin.css',
})
export class Sigin {

  SiginDto: any = {
    Email: '',
    Password: '',
  };

  // Password show / hide
  showPassword = false;

  Isloading = signal(false);

  constructor(
    private authService: Authentication,
    private router: Router,
    private messageModal: MessageModalService
  ) {}

  Sigin(SiginDto: any) {

    this.Isloading.set(true);

    this.authService.Sigin(SiginDto).subscribe(

      (response: any) => {

        console.log('Sigin successful:', response);

        this.authService.SaveToken(response.token);

        window.location.reload();

        this.Isloading.set(false);
      },

      (error: any) => {

        console.error('Sigin failed:', error);

        this.messageModal.show(error?.error?.message);

        this.Isloading.set(false);
      }

    );
  }

}