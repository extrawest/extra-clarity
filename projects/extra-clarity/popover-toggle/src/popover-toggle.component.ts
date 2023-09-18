import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { angleIcon, ClarityIcons } from '@cds/core/icon';
import { Directions } from '@cds/core/internal';
import {
  ClrAxis,
  ClrPopoverEventsService,
  ÇlrClrPopoverModuleNext as ClrPopoverModuleNext,
  ClrPopoverPosition,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
  ClrSide,
} from '@clr/angular';
import { uniqueIdFactory } from '@extrawest/extra-clarity/utils';
import { Subject, takeUntil } from 'rxjs';

import { clrAlignmentMap } from './constants';
import { CdkTrapFocusDirective } from './directives';
import { AnchorToContentAlign, ContentPosition, PopoverToggleButtonStatus, PopoverToggleButtonStyle } from './enums';
import { DropdownIconPosition } from './enums/dropdown-icon-position.enum';
import { PopoverAlign } from './types';

@Component({
  selector: 'ec-popover-toggle',
  templateUrl: './popover-toggle.component.html',
  styleUrls: ['./popover-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgTemplateOutlet,
    CdkTrapFocusDirective,
    CdsIconModule,
    ClrPopoverModuleNext,
  ],
  providers: [
    ClrPopoverEventsService,
    ClrPopoverPositionService,
    ClrPopoverToggleService,
  ],
})
export class PopoverToggleComponent implements OnChanges, OnDestroy {
  @Input()
  public anchorToContentAlign: AnchorToContentAlign = AnchorToContentAlign.StartToStart;

  @Input()
  public contentPosition: ContentPosition = ContentPosition.Bottom;

  @Input()
  public btnDisabled: boolean = false;

  @Input()
  public btnSmall: boolean = true;

  @Input()
  public btnStatus: PopoverToggleButtonStatus = PopoverToggleButtonStatus.Primary;

  @Input()
  public btnStyle: PopoverToggleButtonStyle = PopoverToggleButtonStyle.Outline;

  @Input()
  public closeOnClickOutside: boolean = true;

  @Input()
  public closeOnScroll: boolean = true;

  @Input()
  public labelText: string = '';

  @Input()
  public labelTmplRef?: TemplateRef<unknown>;

  @Input()
  public withDropdownIcon: boolean = false;

  @Input()
  public dropdownIconDirection: Directions = 'down';

  @Input()
  public dropdownIconPosition: DropdownIconPosition = DropdownIconPosition.Right;

  @Output()
  public openChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('anchor', { static: true })
  protected anchor?: ElementRef<HTMLButtonElement>;

  protected isOpen = false;

  protected buttonClasses: string[];
  protected popoverPosition: ClrPopoverPosition;

  protected readonly popoverId = uniqueIdFactory();

  protected readonly DropdownIconPosition = DropdownIconPosition;

  private readonly destroy$ = new Subject<void>();

  constructor(private clrPopoverToggleService: ClrPopoverToggleService) {
    this.popoverPosition = this.getPopoverPosition();
    this.buttonClasses = this.getButtonClasses();

    this.clrPopoverToggleService.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        if (this.isOpen === isOpen) return;

        if (!isOpen) {
          this.anchor?.nativeElement.focus();
        }
        this.openChange.emit(isOpen);
        this.isOpen = isOpen;
      });

    ClarityIcons.addIcons(angleIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentPosition'] || changes['anchorToContentAlign']) {
      this.popoverPosition = this.getPopoverPosition();
    }

    if (
      changes['btnStatus'] ||
      changes['btnStyle'] ||
      changes['btnSmall'] ||
      changes['labelTmplRef']
    ) {
      this.buttonClasses = this.getButtonClasses();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getButtonClasses(): string[] {
    const classes = [
      'btn',
      'ec-button-trigger',
      this.getButtonStyleClass(),
    ];

    if (this.btnSmall) {
      classes.push('btn-sm');
    }
    if (this.labelTmplRef) {
      classes.push('ec-custom-label');
    }
    return classes;
  }

  private getButtonStyleClass(): string {
    if (this.btnStyle === PopoverToggleButtonStyle.Flat) {
      return 'btn-link';
    }
    if (this.btnStyle === PopoverToggleButtonStyle.Solid) {
      return this.btnStatus;
    }
    if (this.btnStatus !== PopoverToggleButtonStatus.Primary) {
      return this.btnStatus + '-outline';
    }
    return 'btn-outline';
  }

  private getClrPopoverAnchorAndContent(
    align: AnchorToContentAlign,
  ): Pick<ClrPopoverPosition, 'anchor' | 'content'> {
    const [anchor, content] = align.split('-');

    return {
      anchor: clrAlignmentMap[anchor as PopoverAlign],
      content: clrAlignmentMap[content as PopoverAlign],
    };
  }

  private getClrPopoverAxisAndSide(
    position: ContentPosition,
  ): Pick<ClrPopoverPosition, 'axis' | 'side'> {
    const axis = (position === ContentPosition.Bottom || position === ContentPosition.Top)
      ? ClrAxis.VERTICAL
      : ClrAxis.HORIZONTAL;

    const side = (position === ContentPosition.Bottom || position === ContentPosition.Right)
      ? ClrSide.AFTER
      : ClrSide.BEFORE;

    return { axis, side };
  }

  private getPopoverPosition(): ClrPopoverPosition {
    return {
      ...this.getClrPopoverAxisAndSide(this.contentPosition),
      ...this.getClrPopoverAnchorAndContent(this.anchorToContentAlign),
    };
  }
}
