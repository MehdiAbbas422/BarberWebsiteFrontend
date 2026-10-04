import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../../../Service/Auth/authentication';
import { Router } from '@angular/router';
import { MessageModalService } from '../../../../shared/message-modal.service';
@Component({
  selector: 'app-change-user-name',
  imports: [FormsModule],
  templateUrl: './change-user-name.html',
  styleUrl: './change-user-name.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeUserName {
  private readonly authService = inject(Authentication);
  private readonly router = inject(Router)
  private readonly messageModal = inject(MessageModalService);

  name = '';
  isLoading = signal(false);
  message = signal('');
  messageType = signal<'success' | 'error' | ''>('');

  changeUserName(): void {
    const name = this.name.trim();
    if (!name || this.isLoading()) return;

    this.isLoading.set(true);
    this.message.set('');
    this.messageType.set('');

    this.authService.ChangeUserName(name).subscribe({
      next: () => {
        this.message.set('Username updated successfully.');
        this.messageType.set('success');
        this.isLoading.set(false);
        this.router.navigate(['/'])
      },
      error: (err:any) => {
        console.log(err)
        this.messageModal.showHttpError(err);
        this.message.set('Unable to update your username. Please try again.');
        this.messageType.set('error');
        this.isLoading.set(false);
      },
    });
  }
}
