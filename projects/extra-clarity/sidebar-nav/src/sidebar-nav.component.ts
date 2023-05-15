import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ClrVerticalNavModule } from '@clr/angular';

import { SidebarNavGroupComponent } from './components/sidebar-nav-group';
import { SidebarNavItemComponent } from './components/sidebar-nav-item';
import { NAV_ITEM_TYPE, NavListItem } from './sidebar-nav.models';
import { SidebarNavService } from './sidebar-nav.service';

@Component({
  selector: 'ec-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrVerticalNavModule,
    SidebarNavGroupComponent,
    SidebarNavItemComponent,
  ],
  providers: [
    SidebarNavService,
  ],
})
export class SidebarNavComponent implements OnInit {
  @Input() navList: readonly NavListItem[] = [];
  @Input() customLabelTpl?: TemplateRef<unknown> | undefined;

  protected readonly NavItemTypeEnum = NAV_ITEM_TYPE;

  constructor(private navService: SidebarNavService) {}

  ngOnInit(): void {
    this.navService.customLabelTemplateRef = this.customLabelTpl;
  }
}
