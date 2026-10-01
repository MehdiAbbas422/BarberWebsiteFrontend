import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    Router,
    NavigationEnd
} from '@angular/router';
import { Sidebar } from './Component/Sidebar/sidebar/sidebar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barber-salon-ui');

    showSidebar = true;

    constructor(
        private router: Router
    ) {

        this.router.events.subscribe(event => {

            if (event instanceof NavigationEnd) {

                const authRoutes = [
                    '/sigin',
                    '/sigup',
                    '/resetpassword'
                ];

                this.showSidebar =
                    !authRoutes.includes(event.urlAfterRedirects);

            }

        });

      }}
