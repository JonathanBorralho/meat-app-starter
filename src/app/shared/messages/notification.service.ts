import { EventEmitter } from '../../../../node_modules/@angular/core';

export class NotificationService {
  notifier = new EventEmitter<string>();

  notify(message: string) {
    this.notifier.emit(message);
  }
}
