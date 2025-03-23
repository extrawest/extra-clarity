import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

import { EcNavItemGroup, EcNavItemLink } from '../../sidebar-nav.models';
import { EcSidebarNavService } from '../../sidebar-nav.service';

@Component({
  selector: 'ec-sidebar-nav-label',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="navItem">
      <ng-container
        [ngTemplateOutlet]="customLabelTpl ?? defaultLabelTpl"
        [ngTemplateOutletContext]="{ $implicit: navItem }"
      />
      <ng-template #defaultLabelTpl>
        {{ navItem.label }}
      </ng-template>
    </ng-container>
  `,
  host: {
    '[style.font-weight]': `fontWeight`,
  },
})
export class EcSidebarNavLabelComponent implements OnInit {
  @Input() navItem?: EcNavItemLink | EcNavItemGroup;
  @Input() isBold: boolean = false;

  customLabelTpl?: TemplateRef<unknown>;

  get fontWeight(): string {
    return this.isBold
      ? 'var(--cds-global-typography-font-weight-semibold, 600)'
      : 'var(--cds-global-typography-font-weight-regular, 400)';
  }

  constructor(private navService: EcSidebarNavService) {}

  ngOnInit(): void {
    this.customLabelTpl = this.navService.customLabelTemplateRef;
  }
}
