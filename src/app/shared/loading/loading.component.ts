import { Component, Input } from '@angular/core';

@Component({
  selector: 'mt-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @Input() isLoading = false;

  constructor() { }

}
