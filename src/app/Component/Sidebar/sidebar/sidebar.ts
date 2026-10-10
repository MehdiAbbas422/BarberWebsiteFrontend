import { Component, OnInit ,  HostListener, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Authentication } from '../../../Service/Auth/authentication';
import { ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../../../shared/theme.service';

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

  // Public so the template can read the current theme state.
  readonly theme = inject(ThemeService);

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
  // THEME
  // Color theme ON  -> original dark + gold UI
  // Color theme OFF -> white / light UI
  // =========================================

  toggleTheme(): void {

    this.theme.toggle();

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
