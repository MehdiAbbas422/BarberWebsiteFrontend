import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
    Router,
    NavigationEnd
} from '@angular/router';
import { Sidebar } from './Component/Sidebar/sidebar/sidebar';
import { MessageModalService } from './shared/message-modal.service';
import { ThemeService } from './shared/theme.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('barber-salon-ui');
    readonly messageModal = inject(MessageModalService);

    // Instantiated here so the saved theme is applied on every route,
    // including the auth pages where the sidebar is not rendered.
    private readonly theme = inject(ThemeService);

    showSidebar = true;

    constructor(
        private router: Router
    ) {

        this.router.events.subscribe(event => {

            if (event instanceof NavigationEnd) {

                const authRoutes = [
                    '/sigin',
                    '/sigup',
                    '/resetpassword',
                    '/notfound'
                ];

                this.showSidebar =
                    !authRoutes.includes(event.urlAfterRedirects);

            }

        });

      }}
