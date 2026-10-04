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

  close(): void {
    this.message.set('');
    this.isOpen.set(false);
  }
}