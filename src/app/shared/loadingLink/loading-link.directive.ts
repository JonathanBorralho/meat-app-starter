import { Directive, Input, HostListener, OnDestroy, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router, Event, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Directive({
  selector: '[mtLoadingLink]',
  exportAs: 'loadingLink'
})
export class LoadingLinkDirective implements OnInit, OnDestroy {
  private iconElement: any;
  private classSpinner = ['fa', 'fa-circle-o-notch', 'fa-spin'];
  private classDisabled = 'disabled';
  private isLoading$ = new Subject<boolean>();
  private inscricoes: Subscription[] = [];
  @Input('mtLoadingLink') mtLoadingLink: string;

  constructor(
    private router: Router, private renderer: Renderer2,
    private el: ElementRef
  ) { }

  @HostListener('click')
  onClick() {
    const inscricao = this.router.events.subscribe((e: Event) => {
      if (e instanceof RouteConfigLoadStart) {
        if (e.route.path === this.mtLoadingLink.trim()) {
          this.isLoading$.next(true);
        }
      }
      if (e instanceof RouteConfigLoadEnd) {
        if (e.route.path === this.mtLoadingLink.trim()) {
          this.isLoading$.next(false);
        }
      }
    });
    this.inscricoes.push(inscricao);
  }

  ngOnInit() {
    const space = this.renderer.createText(' '); // distanciamento entre o link to texto e o ícone
    this.renderer.appendChild(this.el.nativeElement, space);

    this.createIconElement();

    const incricao = this.isLoading$.subscribe(isLoading => {
      if (isLoading) {
        this.addSpinner();
      } else {
        this.removeSpinner();
      }
    });
    this.inscricoes.push(incricao);
  }

  private createIconElement() {
    this.iconElement = this.renderer.createElement('i');
    this.classSpinner.forEach(cl => {
      this.renderer.addClass(this.iconElement, cl);
    });
  }

  private addSpinner() {
    this.renderer.addClass(this.el.nativeElement, this.classDisabled);
    this.renderer.appendChild(this.el.nativeElement, this.iconElement);
  }

  private removeSpinner() {
    this.renderer.removeClass(this.el.nativeElement, this.classDisabled);
    this.renderer.removeChild(this.el.nativeElement, this.iconElement);
  }

  ngOnDestroy() {
    this.inscricoes.forEach(i => i.unsubscribe());
  }
}
