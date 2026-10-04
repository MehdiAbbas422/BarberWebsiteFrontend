import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageModalService {
  readonly message = signal('');
  readonly isOpen = signal(false);

  show(message: unknown): void {
    const text = typeof message === 'string' ? message.trim() : '';
    this.message.set(text || 'Maybe your token has expired. Please sign in again.');
    this.isOpen.set(true);
  }

  showHttpError(error: unknown, fallbackMessage?: unknown): void {
    const status = typeof error === 'object' && error !== null && 'status' in error
      ? error.status
      : undefined;

    if (status === 401 || status === 403) {
      this.show('Maybe your token has expired. Please sign in again.');
      return;
    }

    if (fallbackMessage !== undefined) {
      this.show(fallbackMessage);
    }
  }

  close(): void {
    this.message.set('');
    this.isOpen.set(false);
  }
}