import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ec-router-link-wrapper',
  template: `
    <a [routerLink]="fwdRouterLink" *ngIf="enabled; else content">
      <ng-container *ngTemplateOutlet="content" />
    </a>
    <ng-template #content>
      <ng-content/>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
})
export class LinkWrapperComponent {
  @Input() enabled: unknown = false;
  @Input() fwdRouterLink: unknown[] | string | null | undefined;
}
