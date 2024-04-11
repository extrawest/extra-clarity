import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, copyIcon } from '@cds/core/icon';
import { ClrLoadingState } from '@clr/angular';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { Subject, takeUntil } from 'rxjs';

import { animations } from './button-copy-to-clipboard.animations';

export const BUTTON_DEFAULTS = {
  buttonSizePx: 24,
  iconSizePx: 16,
  title: 'Copy to Clipboard',
} as const;

@Component({
  selector: 'ec-button-copy-to-clipboard, ec-btn-copy',
  templateUrl: './button-copy-to-clipboard.component.html',
  styleUrls: ['./button-copy-to-clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
  ],
  animations,
})
export class EcButtonCopyToClipboardComponent implements OnDestroy, OnInit {
  /** Whether the button is disabled (blocked) */
  @Input()
  public disabled = false;

  /**
   * Height in pixels for the button. Includes the border size if `[withBorder]="true"`.
   *
   * If not provided, then a value from the `sizePx` input is used instead.
   * */
  @Input()
  public heightPx?: number;

  /** Size (width & height) in pixels for icons and spinners inside of the button */
  @Input()
  public iconSizePx: number = BUTTON_DEFAULTS.iconSizePx;

  /** An optional text label for the default state */
  @Input()
  public label?: string;

  /** Font size for the label set by the `label` input.
   *
   * If not provided, then a value from the global Clarity styles is used.
   * */
  @Input()
  public labelFontSizePx?: number;

  /**
   * Size (width & height) in pixels.
   *
   * NOTE: The inputs `widthPx` and `heightPx` have higher priority and override the according dimension.
   * */
  @Input()
  public sizePx: number = BUTTON_DEFAULTS.buttonSizePx;

  /**
   * A string to be copied to the clipboard when the button is pressed.
   *
   * If not provided (or provided either as `null` or `undefined`), the button will be disabled.
   */
  @Input()
  public textToCopy?: string | null;

  /** A string to be shown as a tooltip on hovering the button */
  @Input()
  public title?: string;

  /**
   * Width in pixels for the button. Includes the border size if `[withBorder]="true"`.
   *
   * If not provided, then a value from the `sizePx` input is used instead.
   * */
  @Input()
  public widthPx?: number;

  /** Whether to use animation inside the button */
  @Input()
  public withAnimation = true;

  /** Whether to show a border around the button */
  @Input()
  public withBorder = false;

  /** Emits a string successfully copied to the clipboard by pressing the button */
  @Output()
  public copied = new EventEmitter<string>();

  /** Emits an unknown value on failed copying, caught from `navigator.clipboard.writeText()` */
  @Output()
  public failed = new EventEmitter<unknown>();

  protected btnLoadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

  protected readonly clrLoadingState = ClrLoadingState;

  private changeDetectionRef = inject(ChangeDetectorRef);

  private readonly destroy$ = new Subject<void>();

  constructor(protected readonly commonStrings: EcCommonStringsService) {
    ClarityIcons.addIcons(copyIcon);
  }

  protected get iconSizeAsString(): string {
    return this.iconSizePx.toString();
  }

  protected get spinnerStylePatch(): Record<string, unknown> {
    return {
      'height.px': this.iconSizePx,
      'width.px': this.iconSizePx,
      'min-height.px': this.iconSizePx,
      'min-width.px': this.iconSizePx,
      'vertical-align': 'middle',
    };
  }

  protected copy(): void {
    if (
      !navigator?.clipboard?.writeText ||
      !this.textToCopy ||
      this.btnLoadingState !== ClrLoadingState.DEFAULT
    ) {
      return;
    }

    this.btnLoadingState = ClrLoadingState.LOADING;
    const textToCopy = this.textToCopy;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        this.btnLoadingState = ClrLoadingState.SUCCESS;
        this.copied.emit(textToCopy);
        this.changeDetectionRef.markForCheck();
      })
      .catch(error => {
        this.btnLoadingState = ClrLoadingState.DEFAULT;
        this.failed.emit(error);
        this.changeDetectionRef.markForCheck();
      });
  }

  protected resetToDefaultState(): void {
    this.btnLoadingState = ClrLoadingState.DEFAULT;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.changeDetectionRef.markForCheck());
  }
}
