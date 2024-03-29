import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ClrVerticalNavModule } from '@clr/angular';

import { SidebarNavGroupComponent } from './components/sidebar-nav-group';
import { SidebarNavItemComponent } from './components/sidebar-nav-item';
import { NAV_ITEM_TYPE, NavList } from './sidebar-nav.models';
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
  /**
   * Array of nav items configurations
   *
   * @required
   */
  @Input()
  public navList: NavList = [];

  /**
   * Optional `TemplateRef` for a template to use as a custom label for all nav items.
   *
   * The entire `navItem: NavItemLink | NavItemGroup` object is passed
   * to the template as the `$implicit` context parameter.
   */
  @Input()
  public customLabelTpl?: TemplateRef<unknown>;

  protected readonly NavItemTypeEnum = NAV_ITEM_TYPE;

  constructor(private navService: SidebarNavService) {}

  ngOnInit(): void {
    this.navService.customLabelTemplateRef = this.customLabelTpl;
  }
}
