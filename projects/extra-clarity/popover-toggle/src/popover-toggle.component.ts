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
import {
  CdkTrapFocusDirective,
  EcPopoverToggleLabelDirective,
} from './directives';
import {
  AnchorToContentAlign,
  ContentPosition,
  PopoverToggleButtonStatus,
  PopoverToggleButtonStyle,
} from './enums';
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
  public anchorToContentAlign: AnchorToContentAlign = AnchorToContentAlign.StartToStart;

  /**
   * The content body position relative to the anchor (toggle button).
   */
  @Input()
  public contentPosition: ContentPosition = ContentPosition.Bottom;

  /** Whether the toggle button is disabled */
  @Input()
  public btnDisabled: boolean = false;

  /** Whether the toggle button is smaller (with the Clarity 'btn-sm' class) */
  @Input()
  public btnSmall: boolean = true;

  /** Status-color of the toggle button according to the Clarity button statuses */
  @Input()
  public btnStatus: PopoverToggleButtonStatus = PopoverToggleButtonStatus.Primary;

  /** Style of the toggle button according to Clarity button styles (flat, solid, outline) */
  @Input()
  public btnStyle: PopoverToggleButtonStyle = PopoverToggleButtonStyle.Outline;

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
  public dropdownIconPosition: DropdownIconPosition = DropdownIconPosition.Right;

  /** Show/hide the content body on change of this input:
   *
   * `true` = show
   * `false` = hide
   */
  @Input()
  public open?: boolean = false;

  /** Emit a boolean on showing/hiding the content body with a new state:
   *
   * `true` = open
   * `false` = closed
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
    const classes = [
      'btn',
      'ec-button-trigger',
      this.getButtonStyleClass(),
    ];

    if (this.btnSmall) {
      classes.push('btn-sm');
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
