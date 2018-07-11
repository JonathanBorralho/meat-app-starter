import { state, trigger, style, transition, animate, keyframes } from '../../../node_modules/@angular/animations';

export const restaurantAppeared = trigger('restaurantAppeared', [
  state('ready', style({ opacity: 1})),
  transition('void => ready', [
    style({ opacity: 0, transform: 'translate(-30px, -10px)'}),
    animate('300ms 0s ease-in-out')
  ])
]);

export const listItemAppeared = trigger('listItemAppeared', [
  transition(':enter', [ // obs.: o tutor do curso usou o mesmo código da animação restaurantAppeared. Essa é uma versão reduzida
    style({ opacity: 0, transform: 'translateY(-20px)'}),
    animate('300ms 0s ease-in')
  ])
]);

export const rowShoppingCart = trigger('row', [
  transition(':enter', [
    animate('300ms 0s ease-in', keyframes([
      style({ opacity: 0, transform: 'translateX(-30px)', offset: 0 }),
      style({ opacity: 0.8, transform: 'translateX(10px)', offset: 0.8 }),
      style({ opacity: 0, transform: 'translateX(0px)', offset: 1 })
    ]))
  ]),
  transition(':leave', [
    animate('300ms 0s ease-out', keyframes([
      style({ opacity: 1, transform: 'translateX(0px)', offset: 0 }),
      style({ opacity: 0.8, transform: 'translateX(-10px)', offset: 0.2 }),
      style({ opacity: 0, transform: 'translateX(30px)', offset: 1 })
    ]))
  ])
]);
