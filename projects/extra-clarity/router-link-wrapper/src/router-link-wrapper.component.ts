import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';

@Component({
  selector: 'ec-router-link',
  template: `
    <a
      *ngIf="enabled; else content"
      [routerLink]="fwdRouterLink"
      [queryParams]="queryParams ?? null"
    >
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
export class EcRouterLinkWrapperComponent {
  /**
   * When `true`-ish, enables the link (including styling), by wrapping the content with `<a [routerLink]>` internally.
   *
   * When `false`-ish, disables the link, and shows the content directly without any wrappers.
   * */
  @Input()
  public enabled: unknown = false;

  /** Router link to be forwarded to the internal `<a [routerLink]>` */
  @Input()
  public fwdRouterLink: unknown[] | string | null | undefined;

  /** Query params to be forwarded to the internal `<a [routerLink] [queryParams]>` */
  @Input()
  public queryParams?: Params | null;
}
