import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

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
      .do(message => {
        this.message = message;
        this.snackVisibility = 'visible';
      })
      .switchMap(_ => Observable.timer(3000))
      .subscribe(_ => this.snackVisibility = 'hidden');
  }

}
