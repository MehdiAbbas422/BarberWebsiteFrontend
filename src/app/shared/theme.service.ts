import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'app-color-theme';
const LIGHT_CLASS = 'theme-light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    /**
     * true  -> original colored (dark + gold) UI theme
     * false -> white / light UI theme
     */
    readonly isColorTheme = signal<boolean>(this.readStoredValue());

    constructor() {
        this.apply(this.isColorTheme());
    }

    toggle(): void {
        this.set(!this.isColorTheme());
    }

    set(isColorTheme: boolean): void {
        this.isColorTheme.set(isColorTheme);

        if (this.isBrowser) {
            try {
                localStorage.setItem(STORAGE_KEY, isColorTheme ? 'color' : 'light');
            } catch {
                /* storage unavailable - ignore */
            }
        }

        this.apply(isColorTheme);
    }

    private readStoredValue(): boolean {
        // Server always renders the default (colored) theme.
        if (!this.isBrowser) {
            return true;
        }

        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored === 'light') {
                return false;
            }
        } catch {
            /* storage unavailable - ignore */
        }

        return true;
    }

    private apply(isColorTheme: boolean): void {
        if (!this.isBrowser) {
            return;
        }

        document.documentElement.classList.toggle(LIGHT_CLASS, !isColorTheme);
    }
}
