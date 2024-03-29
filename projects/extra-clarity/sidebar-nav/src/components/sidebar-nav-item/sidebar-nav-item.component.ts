import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CdsIconModule } from '@cds/angular';
import { ClrVerticalNavModule } from '@clr/angular';

import { NAV_ITEM_TYPE, NavListItem } from '../../sidebar-nav.models';
import { SidebarNavService } from '../../sidebar-nav.service';
import { SidebarNavLabelComponent } from '../sidebar-nav-label';

@Component({
  selector: 'ec-sidebar-nav-item',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: ['./sidebar-nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ClrVerticalNavModule,
    SidebarNavLabelComponent,
    CdsIconModule,
  ],
})
export class SidebarNavItemComponent implements OnInit {
  @Input() navItem?: NavListItem;

  readonly NavItemTypeEnum = NAV_ITEM_TYPE;

  constructor(
    readonly changeDetectionRef: ChangeDetectorRef,
    readonly navService: SidebarNavService,
  ) {}

  ngOnInit(): void {
    this.navService.navigationEnd.subscribe(() => {
      // update the view for dynamic classes 'active' & 'disabled' on router-link-items
      this.changeDetectionRef.markForCheck();
    });
  }
}
