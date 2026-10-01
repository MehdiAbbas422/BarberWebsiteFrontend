import { Component, OnInit ,  HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../../../Service/Auth/authentication';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterLink,
    RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit{




// Abhi manually rakha hai
  userName = 'UserName';
 Role:string = ''
  // Testing ke liye abhi Admin
  // Baad mein JWT/localStorage se dynamic kar denge
  
    isSidebarOpen = false;
  isMobileOpen = false;

  constructor(
    private router: Router,
    private auth:Authentication,
    private cdr:ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.Role = this.auth.Role()
  this.cdr.detectChanges();
}
  
   openSidebar(): void {

    this.isSidebarOpen = true;

  }


  // =========================================
  // CLOSE SIDEBAR
  // =========================================

  closeSidebar(): void {

    this.isSidebarOpen = false;

  }


  // =========================================
  // TOGGLE
  // =========================================

  toggleSidebar(): void {

    this.isSidebarOpen =
      !this.isSidebarOpen;

  }


  // =========================================
  // ESCAPE KEY
  // Sidebar open ho aur ESC press ho
  // to sidebar close
  // =========================================

  @HostListener('document:keydown.escape')
  onEscape(): void {

    if (this.isSidebarOpen) {

      this.closeSidebar();

    }

  }


  // =========================================
  // NAVIGATION CLICK
  // =========================================

  navigate(): void {

    // Mobile/tablet par route change ke baad
    // sidebar automatically close
    this.closeSidebar();

  }


  // =========================================
  // LOGOUT
  // =========================================

  Logout(): void {

    localStorage.removeItem('token');

    localStorage.removeItem('Role');

    this.closeSidebar();

    this.router.navigate(['/sigin']);

  }



}
