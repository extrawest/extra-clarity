import { NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClarityIcons, copyIcon } from '@cds/core/icon';
import { ClrIconModule, ClrLoadingState } from '@clr/angular';

import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';

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
  imports: [NgStyle, ClrIconModule],
  animations,
})
export class EcButtonCopyToClipboardComponent implements OnChanges, OnInit {
  /** Whether the button is disabled (blocked) */
  public readonly disabled = input<boolean>(false);

  /**
   * Height in pixels for the button. Includes the border size if `[withBorder]="true"`.
   *
   * If not provided, then a value from the `sizePx` input is used instead.
   * */
  public readonly heightPx = input<number>();

  /** Size (width & height) in pixels for icons and spinners inside of the button */
  public readonly iconSizePx = input<number>(BUTTON_DEFAULTS.iconSizePx);

  /** An optional text label for the default state */

  public readonly label = input<string>();

  /** Font size for the label set by the `label` input.
   *
   * If not provided, then a value from the global Clarity styles is used.
   * */
  public readonly labelFontSizePx = input<number>();

  /**
   * Size (width & height) in pixels.
   *
   * NOTE: The inputs `widthPx` and `heightPx` have higher priority and override the according dimension.
   * */
  public readonly sizePx = input<number>(BUTTON_DEFAULTS.buttonSizePx);

  /**
   * A string or a number to be copied to the clipboard when the button is pressed.
   *
   * If not provided (or provided either as `null` or `undefined`), the button will be disabled.
   */
  public readonly textToCopy = input<string | number | null>();

  /** A string to be shown as a tooltip on hovering the button */
  public readonly title = input<string>();

  /**
   * Width in pixels for the button. Includes the border size if `[withBorder]="true"`.
   *
   * If not provided, then a value from the `sizePx` input is used instead.
   * */
  public readonly widthPx = input<number>();

  /** Whether to use animation inside the button */
  public readonly withAnimation = input<boolean>(true);

  /** Whether to show a border around the button */
  public readonly withBorder = input<boolean>(false);

  /**
   * Emits a string successfully copied to the clipboard by pressing the button
   *
   * `EventEmitter<string>`
   * */
  public readonly copied = output<string>();

  /**
   * Emits an unknown value on failed copying, caught from `navigator.clipboard.writeText()`
   *
   * `EventEmitter<unknown>`
   */
  public readonly failed = output<unknown>();

  protected btnLoadingState: ClrLoadingState = ClrLoadingState.DEFAULT;
  protected textToCopyAsString: string = '';

  protected readonly clrLoadingState = ClrLoadingState;

  constructor(
    protected readonly commonStrings: EcCommonStringsService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {
    ClarityIcons.addIcons(copyIcon);
  }

  protected get iconSizeAsString(): string {
    return this.iconSizePx().toString();
  }

  protected get spinnerStylePatch(): Record<string, unknown> {
    const iconSizePx = this.iconSizePx();
    return {
      'height.px': iconSizePx,
      'width.px': iconSizePx,
      'min-height.px': iconSizePx,
      'min-width.px': iconSizePx,
      'vertical-align': 'middle',
    };
  }

  protected copy(): void {
    if (
      !navigator?.clipboard?.writeText ||
      !this.textToCopyAsString ||
      this.btnLoadingState !== ClrLoadingState.DEFAULT
    ) {
      return;
    }

    this.btnLoadingState = ClrLoadingState.LOADING;
    const textToCopy = this.textToCopyAsString;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        this.btnLoadingState = ClrLoadingState.SUCCESS;
        this.copied.emit(textToCopy);
        this.changeDetectionRef.markForCheck();
      })
      .catch((error) => {
        this.btnLoadingState = ClrLoadingState.DEFAULT;
        this.failed.emit(error);
        this.changeDetectionRef.markForCheck();
      });
  }

  protected resetToDefaultState(): void {
    this.btnLoadingState = ClrLoadingState.DEFAULT;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['textToCopy']) {
      this.textToCopyAsString = this.getTextToCopyAsString(this.textToCopy());
    }
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectionRef.markForCheck());
  }

  private getTextToCopyAsString(text: string | number | null | undefined): string {
    if (text === 0) {
      return '0';
    }

    if (!text) {
      return '';
    }

    if (typeof text === 'number') {
      return text.toString();
    }

    return text;
  }
}
