import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { ClarityIcons, angleIcon } from '@cds/core/icon';
import { Directions } from '@cds/core/internal';
import {
  ClrAxis,
  ClrIconModule,
  ClrPopoverEventsService,
  ÇlrClrPopoverModuleNext as ClrPopoverModuleNext,
  ClrPopoverPosition,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
  ClrSide,
} from '@clr/angular';
import { Subject, takeUntil } from 'rxjs';

import { uniqueIdFactory } from '@extrawest/extra-clarity/utils';

import { clrAlignmentMap } from './constants';
import { CdkTrapFocusDirective, EcPopoverToggleLabelDirective } from './directives';
import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
} from './enums';
import { EcDropdownIconPosition } from './enums/dropdown-icon-position.enum';
import { EcPopoverAlign } from './types';

@Component({
  selector: 'ec-popover-toggle',
  templateUrl: './popover-toggle.component.html',
  styleUrls: ['./popover-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgClass,
    NgIf,
    NgTemplateOutlet,
    CdkTrapFocusDirective,
    ClrIconModule,
    ClrPopoverModuleNext,
  ],
  providers: [ClrPopoverEventsService, ClrPopoverPositionService, ClrPopoverToggleService],
})
export class EcPopoverToggleComponent implements OnChanges, OnDestroy {
  /**
   * Configure the linking point of the toggle-button and content-body.
   * The first half defines the point on the anchor (button), and second one is for the content body.
   *
   * When `contentPosition` is horizontal (Left, Right):
   * * `start` corresponds to the top corner of the button or content body
   * * `center` = the middle point
   * * `end` = the bottom corner
   *
   * When `contentPosition` is vertical (Top, Bottom):
   * * `start` corresponds to the left corner of the button or content body
   * * `center` = the middle point
   * * `end` = the right corner
   */
  @Input()
  public anchorToContentAlign: EcAnchorToContentAlign = EcAnchorToContentAlign.StartToStart;

  /**
   * The content body position relative to the anchor (toggle button).
   */
  @Input()
  public contentPosition: EcContentPosition = EcContentPosition.Bottom;

  /** Whether the toggle button is disabled */
  @Input()
  public btnDisabled: boolean = false;

  /** Whether the toggle button is smaller (with the Clarity 'btn-sm' class) */
  @Input()
  public btnSmall: boolean = true;

  /** Status-color of the toggle button according to the Clarity button statuses */
  @Input()
  public btnStatus: EcPopoverToggleButtonStatus = EcPopoverToggleButtonStatus.Primary;

  /** Style of the toggle button according to Clarity button styles (flat, solid, outline) */
  @Input()
  public btnStyle: EcPopoverToggleButtonStyle = EcPopoverToggleButtonStyle.Outline;

  /** Whether to hide the content body on clicking outside of the component */
  @Input()
  public closeOnClickOutside: boolean = true;

  /** Whether to hide the content body on scrolling outside of the component */
  @Input()
  public closeOnScroll: boolean = true;

  /**
   * Text label to show inside of the toggle button. Ignored when a custom label is projected
   * into the component using the `EcPopoverToggleLabelDirective` directive.
   */
  @Input()
  public labelText: string = '';

  /**
   * Show the 'angle' cds-icon next to the text label. Ignored when a custom label is projected
   * into the component using the `EcPopoverToggleLabelDirective` directive.
   */
  @Input()
  public withDropdownIcon: boolean = false;

  /**
   * Direction of the 'angle' cds-icon (when `withDropdownIcon` is set to `true`). Ignored when
   * a custom label is projected into the component using the `EcPopoverToggleLabelDirective` directive.
   *
   * `down | up | left | right`
   */
  @Input()
  public dropdownIconDirection: Directions = 'down';

  /**
   * Position of the 'angle' cds-icon (when `withDropdownIcon` is set to `true`) relatively to the text label.
   * Ignored when a custom label is projected into the component using the `EcPopoverToggleLabelDirective` directive.
   */
  @Input()
  public dropdownIconPosition: EcDropdownIconPosition = EcDropdownIconPosition.Right;

  /** Show/hide the content body on change of this input:
   * * `true` = show
   * * `false` = hide
   */
  @Input()
  public open?: boolean = false;

  /** Emit a boolean on showing/hiding the content body with a new state:
   * * `true` = open
   * * `false` = closed
   *
   * `EventEmitter<boolean>`
   */
  @Output()
  public openChange = new EventEmitter<boolean>();

  @ViewChild('anchor', { static: true })
  protected anchor?: ElementRef<HTMLButtonElement>;

  @ContentChild(EcPopoverToggleLabelDirective)
  protected customLabelContent?: EcPopoverToggleLabelDirective;

  protected isOpen = false;

  protected buttonClasses: string[];
  protected popoverPosition: ClrPopoverPosition;

  protected readonly popoverId = uniqueIdFactory();

  protected readonly EcDropdownIconPosition = EcDropdownIconPosition;

  private readonly destroy$ = new Subject<void>();

  constructor(private clrPopoverToggleService: ClrPopoverToggleService) {
    this.popoverPosition = this.getPopoverPosition();
    this.buttonClasses = this.getButtonClasses();

    this.clrPopoverToggleService.openChange.pipe(takeUntil(this.destroy$)).subscribe((isOpen) => {
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

    if (changes['btnStatus'] || changes['btnStyle'] || changes['btnSmall']) {
      this.buttonClasses = this.getButtonClasses();
    }

    if (changes['open']) {
      this.toggleOpen(changes['open'].currentValue as boolean | undefined);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  /**
   * Toggle the content body visibility, if no arguments provided.
   *
   * Show the content body when `open` is true, and hide when it is `false`.
   */
  public toggleOpen(open?: boolean): void {
    if (typeof open !== 'boolean') {
      this.clrPopoverToggleService.open = !this.clrPopoverToggleService.open;
      return;
    }
    if (open && !this.clrPopoverToggleService.open) {
      this.clrPopoverToggleService.open = true;
      return;
    }
    if (!open && this.clrPopoverToggleService.open) {
      this.clrPopoverToggleService.open = false;
    }
  }

  private getButtonClasses(): string[] {
    const classes = ['btn', 'ec-button-trigger', this.getButtonStyleClass()];

    if (this.btnSmall) {
      classes.push('btn-sm');
    }

    return classes;
  }

  private getButtonStyleClass(): string {
    if (this.btnStyle === EcPopoverToggleButtonStyle.Flat) {
      return 'btn-link';
    }
    if (this.btnStyle === EcPopoverToggleButtonStyle.Solid) {
      return this.btnStatus;
    }
    if (this.btnStatus !== EcPopoverToggleButtonStatus.Primary) {
      return this.btnStatus + '-outline';
    }
    return 'btn-outline';
  }

  private getClrPopoverAnchorAndContent(
    align: EcAnchorToContentAlign,
  ): Pick<ClrPopoverPosition, 'anchor' | 'content'> {
    const [anchor, content] = align.split('-');

    return {
      anchor: clrAlignmentMap[anchor as EcPopoverAlign],
      content: clrAlignmentMap[content as EcPopoverAlign],
    };
  }

  private getClrPopoverAxisAndSide(
    position: EcContentPosition,
  ): Pick<ClrPopoverPosition, 'axis' | 'side'> {
    const axis =
      position === EcContentPosition.Bottom || position === EcContentPosition.Top
        ? ClrAxis.VERTICAL
        : ClrAxis.HORIZONTAL;

    const side =
      position === EcContentPosition.Bottom || position === EcContentPosition.Right
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
