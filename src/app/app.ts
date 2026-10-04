import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    Router,
    NavigationEnd
} from '@angular/router';
import { Sidebar } from './Component/Sidebar/sidebar/sidebar';
import { MessageModalService } from './shared/message-modal.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barber-salon-ui');
    readonly messageModal = inject(MessageModalService);

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
