import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  contentChild,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  ClarityIcons,
  ClrIcon,
  ClrPopoverHostDirective,
  ClrPopoverModuleNext,
  ClrPopoverService,
  ClrPopoverType,
  Directions,
  angleIcon,
} from '@clr/angular';

import { uniqueIdFactory } from '@extrawest/extra-clarity/utils';

import { getConnectedPosition, getConnectedPositions } from './constants';
import { CdkTrapFocusDirective, EcPopoverToggleLabelDirective } from './directives';
import {
  EcAnchorToContentAlign,
  EcContentPosition,
  EcPopoverToggleButtonStatus,
  EcPopoverToggleButtonStyle,
} from './enums';
import { EcDropdownIconPosition } from './enums/dropdown-icon-position.enum';

@Component({
  selector: 'ec-popover-toggle',
  templateUrl: './popover-toggle.component.html',
  styleUrls: ['./popover-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkTrapFocusDirective, ClrIcon, ClrPopoverModuleNext],
  hostDirectives: [ClrPopoverHostDirective],
})
export class EcPopoverToggleComponent implements OnChanges {
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
   * Show the 'angle' clr-icon next to the text label. Ignored when a custom label is projected
   * into the component using the `EcPopoverToggleLabelDirective` directive.
   */
  @Input()
  public withDropdownIcon: boolean = false;

  /**
   * Direction of the 'angle' clr-icon (when `withDropdownIcon` is set to `true`). Ignored when
   * a custom label is projected into the component using the `EcPopoverToggleLabelDirective` directive.
   *
   * `down | up | left | right`
   */
  @Input()
  public dropdownIconDirection: Directions = 'down';

  /**
   * Position of the 'angle' clr-icon (when `withDropdownIcon` is set to `true`) relatively to the text label.
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

  protected readonly anchor = viewChild.required<ElementRef<HTMLButtonElement>>('anchor');

  protected readonly customLabelContent = contentChild(EcPopoverToggleLabelDirective);

  protected isOpen = false;

  protected buttonClasses: string[];
  protected popoverPosition: ConnectedPosition;

  /**
   * Fallback positions for CDK, ordered so the mirror of `contentPosition` is tried first.
   * Set explicitly because Clarity's own DROPDOWN list is bottom-first for every placement,
   * which would drop a Left/Right popover below the anchor instead of flipping it.
   */
  protected popoverPositions: ConnectedPosition[];

  protected readonly popoverId = uniqueIdFactory();

  /**
   * Clarity only fills in the fallback positions handed to CDK's
   * `.withPositions([preferred, ...available])` when a content type is set, so without this
   * the single position from `popoverPosition` is all CDK has and the popover cannot flip
   * away from a viewport edge. DROPDOWN also matches the 2px offset in `getConnectedPosition`.
   */
  protected readonly popoverType = ClrPopoverType.DROPDOWN;

  protected readonly EcDropdownIconPosition = EcDropdownIconPosition;

  constructor(
    private clrPopoverService: ClrPopoverService,
    private destroyRef: DestroyRef,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.popoverPosition = this.getPopoverPosition();
    this.popoverPositions = this.getPopoverPositions();
    this.buttonClasses = this.getButtonClasses();

    this.clrPopoverService.openChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isOpen) => {
        if (this.isOpen === isOpen) {
          return;
        }
        if (!isOpen) {
          this.anchor().nativeElement.focus();
        }
        this.openChange.emit(isOpen);
        this.isOpen = isOpen;
        // Clarity closes its popover from Escape, outside-click, scroll and an
        // IntersectionObserver. Those all run back inside NgZone, but a tick does not check
        // a clean OnPush view, and assigning `isOpen` from a subscription never marks this
        // one dirty, so `aria-expanded` on the toggle would keep the stale value.
        this.changeDetectorRef.markForCheck();
      });

    ClarityIcons.addIcons(angleIcon);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentPosition'] || changes['anchorToContentAlign']) {
      this.popoverPosition = this.getPopoverPosition();
      this.popoverPositions = this.getPopoverPositions();
    }

    if (changes['btnStatus'] || changes['btnStyle'] || changes['btnSmall']) {
      this.buttonClasses = this.getButtonClasses();
    }

    if (changes['open']) {
      this.toggleOpen(changes['open'].currentValue as boolean | undefined);
    }
  }

  /**
   * Toggle the content body visibility, if no arguments provided.
   *
   * Show the content body when `open` is true, and hide when it is `false`.
   */
  public toggleOpen(open?: boolean): void {
    if (typeof open !== 'boolean') {
      this.clrPopoverService.open = !this.clrPopoverService.open;
      return;
    }
    if (open && !this.clrPopoverService.open) {
      this.clrPopoverService.open = true;
      return;
    }
    if (!open && this.clrPopoverService.open) {
      this.clrPopoverService.open = false;
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

  private getPopoverPosition(): ConnectedPosition {
    return getConnectedPosition(this.contentPosition, this.anchorToContentAlign);
  }

  private getPopoverPositions(): ConnectedPosition[] {
    return getConnectedPositions(this.contentPosition, this.anchorToContentAlign);
  }
}
