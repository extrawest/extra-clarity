import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ClrVerticalNavModule } from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';

import { NAV_ITEM_TYPE, NavItemGroup } from '../../sidebar-nav.models';
import { SidebarNavService } from '../../sidebar-nav.service';
import { SidebarNavItemComponent } from '../sidebar-nav-item';
import { SidebarNavLabelComponent } from '../sidebar-nav-label';

@Component({
  selector: 'ec-sidebar-nav-group',
  templateUrl: './sidebar-nav-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    ClrVerticalNavModule,
    SidebarNavItemComponent,
    SidebarNavLabelComponent,
  ],
})
export class SidebarNavGroupComponent implements OnDestroy, OnInit {
  @Input() navItem?: NavItemGroup;

  isExpanded = false;
  hasActiveLink = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    protected navService: SidebarNavService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.isExpanded = !!this.navItem?.expanded;
    this.checkForActiveLinks();

    this.navService.navigationEnd
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkForActiveLinks();
        this.changeDetectionRef.markForCheck();
      });
  }

  private checkForActiveLinks(): void {
    this.hasActiveLink = !!this.navItem?.children.some(nestedItem => (
      nestedItem.type === NAV_ITEM_TYPE.RouterLink &&
      this.navService.isPathActive(nestedItem.link, 'subset')
    ));

    if (this.hasActiveLink) {
      this.isExpanded = true;
    }
  }
}
