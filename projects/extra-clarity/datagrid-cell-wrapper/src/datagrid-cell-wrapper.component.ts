import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  BUTTON_DEFAULTS,
  EcButtonCopyToClipboardComponent,
} from '@extrawest/extra-clarity/button-copy-to-clipboard';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';

export const CELL_WRAPPER_DEFAULTS = {
  btnTopOffsetRem: -0.25,
} as const;

@Component({
  selector: 'ec-dg-cell-wrapper',
  templateUrl: './datagrid-cell-wrapper.component.html',
  styleUrls: ['./datagrid-cell-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, EcButtonCopyToClipboardComponent],
})
export class EcDatagridCellWrapperComponent implements OnInit {
  /**
   * Where to place the copy-to-clipboard button
   * when the content length is less than the cell width:
   * * `true` = next to the content
   * * `false` = in the top right corner of the cell
   *
   * Applied only if `[withCopyBtn]="true"`
   */
  public readonly btnInline = input<boolean>(false);

  /**
   * Vertical offset (in `rem`) from the top of the first line, applied to the copy-to-clipboard button
   * to adjust how it fits within elements with line-height different from the default datagrid line-height.
   */
  public readonly btnTopOffsetRem = input<number>(CELL_WRAPPER_DEFAULTS.btnTopOffsetRem);

  /**
   * A string to copy into the clipboard on pressing the copy-to-clipboard button.
   *
   * Usually it is a stringified value of the cell.
   *
   * Applied only if `[withCopyBtn]="true"`
   */
  public readonly textToCopy = input<string | null>();

  /**
   * How to handle overflow of the cell content:
   * * `true` = truncate with ellipsis
   * * `false` = break into a new line
   */
  public readonly truncate = input<boolean>(false);

  /** Show a copy-to-clipboard button in the wrapper */
  public readonly withCopyBtn = input<boolean>(false);

  // Inputs to be forward to button-copy-to-clipboard

  /** Whether the button is disabled (blocked) */
  public readonly btnDisabled = input<boolean>(false);

  /**
   * Height in pixels for the button. Includes the border size if `[btnWithBorder]="true"`.
   *
   * If not provided, then a value from the `btnSizePx` input is used instead.
   */
  public readonly btnHeightPx = input<number>();

  /** Size (width & height) in pixels for icons and spinners inside of the button */
  public readonly btnIconSizePx = input<number>(BUTTON_DEFAULTS.iconSizePx);

  /** An optional text label for the default state */
  public readonly btnLabel = input<string>();

  /**
   * Font size for the label set by the `btnLabel` input.
   *
   * If not provided, then a value from the global Clarity styles is used.
   */
  public readonly btnLabelFontSizePx = input<number>();

  /**
   * Size (width & height) in pixels.
   *
   * NOTE: The inputs `btnWidthPx` and `btnHeightPx` have higher priority and override the according dimension.
   */
  public readonly btnSizePx = input<number>(BUTTON_DEFAULTS.buttonSizePx);

  /** A string to be shown as a tooltip on hovering the button */
  public readonly btnTitle = input<string>();

  /**
   * Width in pixels for the button. Includes the border size if `[btnWithBorder]="true"`.
   *
   * If not provided, then a value from the `btnSizePx` input is used instead.
   */
  public readonly btnWidthPx = input<number>();

  /** Whether to use animation inside the button */
  public readonly btnWithAnimation = input<boolean>(true);

  /** Whether to show a border around the button */
  public readonly btnWithBorder = input<boolean>(false);

  /**
   * Emits a `string` successfully copied to the clipboard by pressing the copy-to-clipboard button
   *
   * `EventEmitter<string>`
   */
  public readonly copied = output<string>();

  /**
   * Emits an `unknown` value if copying to the clipboard failed.
   *
   * Caught from `navigator.clipboard.writeText()`.
   *
   * `EventEmitter<unknown>`
   */
  public readonly failed = output<unknown>();

  constructor(
    protected readonly commonStrings: EcCommonStringsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }
}
