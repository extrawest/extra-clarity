import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClrIconModule, ClrVerticalNavModule } from '@clr/angular';

import { EC_NAV_ITEM_TYPE, EcNavItemGroup, EcNavListSingleItem } from '../../sidebar-nav.models';
import { EcSidebarNavService } from '../../sidebar-nav.service';
import { EcSidebarNavItemComponent } from '../sidebar-nav-item';
import { EcSidebarNavLabelComponent } from '../sidebar-nav-label';

@Component({
  selector: 'ec-sidebar-nav-group',
  templateUrl: './sidebar-nav-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ClrIconModule,
    ClrVerticalNavModule,
    EcSidebarNavItemComponent,
    EcSidebarNavLabelComponent,
  ],
})
export class EcSidebarNavGroupComponent implements OnChanges, OnInit {
  @Input() navItem?: EcNavItemGroup;
  @Input() isBold: boolean = false;

  isExpanded = false;
  hasActiveLink = false;

  protected childrenNavItems: readonly EcNavListSingleItem[] = [];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    protected navService: EcSidebarNavService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['navItem']) {
      this.childrenNavItems = this.navService.getUniqueIdentityItems(this.navItem?.children);
    }
  }

  ngOnInit(): void {
    this.isExpanded = !!this.navItem?.expanded;
    this.checkForActiveLinks();

    this.navService.navigationEnd.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.checkForActiveLinks();
      this.changeDetectionRef.markForCheck();
    });
  }

  private checkForActiveLinks(): void {
    this.hasActiveLink = !!this.navItem?.children.some(
      (nestedItem) =>
        nestedItem.type === EC_NAV_ITEM_TYPE.RouterLink &&
        this.navService.isPathActive(nestedItem.link, 'subset'),
    );

    if (this.hasActiveLink) {
      this.isExpanded = true;
    }
  }
}
