import { trigger, state, style, transition, animate } from '../../../../../node_modules/@angular/animations';

export const snackVisibility = trigger('snack-visibility', [
  state('hidden', style({
    opacity: 0,
    bottom: '0px'
  })),
  state('visible', style({
    opacity: 1,
    bottom: '30px'
  })),
  transition('hidden => visible', animate('500ms 0s ease-in')),
  transition('visible => hidden', animate('500ms 0s ease-out'))
]);
