import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';

@Component({
  selector: 'ec-router-link',
  template: `
    @if (enabled()) {
      <a [routerLink]="fwdRouterLink()" [queryParams]="queryParams() ?? null">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <ng-container [ngTemplateOutlet]="content" />
    }
    <ng-template #content>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, RouterLink],
})
export class EcRouterLinkWrapperComponent {
  /**
   * When `true`-ish, enables the link (including styling), by wrapping the content with `<a [routerLink]>` internally.
   *
   * When `false`-ish, disables the link, and shows the content directly without any wrappers.
   * */
  public readonly enabled = input<unknown>(false);

  /** Router link to be forwarded to the internal `<a [routerLink]>` */
  public readonly fwdRouterLink = input<unknown[] | string | null>();

  /** Query params to be forwarded to the internal `<a [routerLink] [queryParams]>` */
  public readonly queryParams = input<Params | null>();
}
