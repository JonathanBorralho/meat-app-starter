import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { snackVisibility } from './snack-visibility.animation';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [ snackVisibility ]
})
export class SnackbarComponent implements OnInit {
  message = 'Hello there!';
  snackVisibility = 'hidden';

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap(message => {
          this.message = message;
          this.snackVisibility = 'visible';
        }),
        switchMap(_ => timer(3000))
      ).subscribe(_ => this.snackVisibility = 'hidden');
  }

}
