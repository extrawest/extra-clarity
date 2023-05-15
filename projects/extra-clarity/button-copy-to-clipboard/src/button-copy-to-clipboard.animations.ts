import { animate, keyframes, style, transition, trigger } from '@angular/animations';

export const animations = [
  // this trigger prevents the initial ':enter' animation on the 'defaultButton' trigger
  trigger('parent', [
    transition(':enter', []),
  ]),
  // the following lines are cloned from the ng-clarity 15.4.0 as it is, please refer to:
  // https://github.com/vmware-clarity/ng-clarity/blob/main/projects/angular/src/button/button-loading/loading-button.ts
  trigger('defaultButton', [
    transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 0 })]),
  ]),
  trigger('spinner', [
    transition(':enter', [style({ opacity: 0 }), animate('200ms 100ms ease-in', style({ opacity: 1 }))]),
    transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
  ]),
  trigger('validated', [
    transition(':enter', [
      animate(
        '600ms',
        keyframes([
          style({ transform: 'scale(0,0)', offset: 0 }),
          style({ opacity: 1, offset: 0.2 }),
          style({ transform: 'scale(1.2,1.2)', offset: 0.4 }),
          style({ transform: 'scale(.9,.9)', offset: 0.6 }),
          style({ transform: 'scale(1,1)', offset: 1 }),
        ]),
      ),
    ]),
    transition(':leave', [style({ opacity: 1 }), animate('100ms ease-out', style({ opacity: 0 }))]),
  ]),
];
