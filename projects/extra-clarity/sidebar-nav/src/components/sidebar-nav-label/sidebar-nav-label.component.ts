import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';

import { NavItemGroup, NavItemLink } from '../../sidebar-nav.models';
import { SidebarNavService } from '../../sidebar-nav.service';

@Component({
  selector: 'ec-sidebar-nav-label',
  standalone: true,
  imports: [
    CommonModule,
  ],
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
})
export class SidebarNavLabelComponent implements OnInit {
  @Input() navItem?: NavItemLink | NavItemGroup;

  customLabelTpl?: TemplateRef<unknown>;

  constructor(private navService: SidebarNavService) {}

  ngOnInit(): void {
    this.customLabelTpl = this.navService.customLabelTemplateRef;
  }
}
