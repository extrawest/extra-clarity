import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ClrIconModule, ClrVerticalNavModule } from '@clr/angular';

import { EC_NAV_ITEM_TYPE, EcNavListItem } from '../../sidebar-nav.models';
import { EcSidebarNavService } from '../../sidebar-nav.service';
import { EcSidebarNavLabelComponent } from '../sidebar-nav-label';

@Component({
  selector: 'ec-sidebar-nav-item',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: ['./sidebar-nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    ClrIconModule,
    ClrVerticalNavModule,
    EcSidebarNavLabelComponent,
  ],
})
export class EcSidebarNavItemComponent implements OnInit {
  @Input() navItem?: EcNavListItem;
  @Input() isBold: boolean = false;

  readonly NavItemTypeEnum = EC_NAV_ITEM_TYPE;

  constructor(
    readonly changeDetectionRef: ChangeDetectorRef,
    readonly navService: EcSidebarNavService,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.navService.navigationEnd.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      // update the view for dynamic classes 'active' & 'disabled' on router-link-items
      this.changeDetectionRef.markForCheck();
    });
  }
}
