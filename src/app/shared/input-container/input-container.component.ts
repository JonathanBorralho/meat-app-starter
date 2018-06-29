import { Component, Input, OnInit, AfterContentInit, ContentChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'mt-input-container',
  templateUrl: './input-container.component.html'
})
export class InputContainerComponent implements OnInit, AfterContentInit {

  @Input() label: string;
  @Input() errorMessage: string;

  @ContentChild(NgModel) model: NgModel;
  input: NgModel;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.input = this.model;
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser usado com a diretiva NgModel');
    }
  }

  get hasSucess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  get hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

}
