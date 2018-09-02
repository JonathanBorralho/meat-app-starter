import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isModuleLoading = false;
  inscricao: Subscription;
  constructor(private router: Router) { }

  ngOnInit() {
    this.inscricao = this.router.events.subscribe((e: Event) => {
      if (e instanceof RouteConfigLoadStart) {
        this.isModuleLoading = true;
      }
      if (e instanceof RouteConfigLoadEnd) {
        this.isModuleLoading = false;
      }
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
