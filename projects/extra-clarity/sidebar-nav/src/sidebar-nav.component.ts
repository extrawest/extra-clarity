import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ClrVerticalNavModule } from '@clr/angular';

import { EcSidebarNavGroupComponent } from './components/sidebar-nav-group';
import { EcSidebarNavItemComponent } from './components/sidebar-nav-item';
import { EC_NAV_ITEM_TYPE, EcNavList } from './sidebar-nav.models';
import { EcSidebarNavService } from './sidebar-nav.service';

@Component({
  selector: 'ec-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ClrVerticalNavModule,
    EcSidebarNavGroupComponent,
    EcSidebarNavItemComponent,
  ],
  providers: [
    EcSidebarNavService,
  ],
})
export class EcSidebarNavComponent implements OnInit {
  /**
   * Array of nav items configurations
   *
   * `(EcNavItemLink | EcNavItemGroup | EcNavItemDivider)[]`
   *
   * @required
   */
  @Input()
  public navList: EcNavList = [];

  /**
   * Optional `TemplateRef` for a template to use as a custom label for all nav items.
   *
   * The entire `navItem: NavItemLink | NavItemGroup` object is passed
   * to the template as the `$implicit` context parameter.
   *
   * `TemplateRef<unknown>`
   */
  @Input()
  public customLabelTpl?: TemplateRef<unknown>;

  /**
   * Sets font-weight styling for root-level nav items and groups:
   * * none - all root elements have normal font-weight (400)
   * * all  - all root elements have bolder font-weight (600)
   * * groups - only group-elements have bolder font-weight (600) -- it's the default Clarity-v17 behavior
   * * items - only non-group elements (standalone items) have bolder font-weight (600)
   */
  @Input()
  public rootLevelBold: 'none' | 'all' | 'groups' | 'items' = 'groups';

  protected readonly NavItemTypeEnum = EC_NAV_ITEM_TYPE;

  constructor(private navService: EcSidebarNavService) {}

  ngOnInit(): void {
    this.navService.customLabelTemplateRef = this.customLabelTpl;
  }
}
