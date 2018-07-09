import { EventEmitter } from '../../../../node_modules/@angular/core';

export class NotificationService {
  notifier = new EventEmitter<any>();

  notify(message: string) {
    this.notifier.emit(message);
  }
}
