import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit,
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
  @Input()
  public btnInline = false;

  /**
   * Vertical offset (in `rem`) from the top of the first line, applied to the copy-to-clipboard button
   * to adjust how it fits within elements with line-height different from the default datagrid line-height.
   */
  @Input()
  public btnTopOffsetRem: number = CELL_WRAPPER_DEFAULTS.btnTopOffsetRem;

  /**
   * A string to copy into the clipboard on pressing the copy-to-clipboard button.
   *
   * Usually it is a stringified value of the cell.
   *
   * Applied only if `[withCopyBtn]="true"`
   */
  @Input()
  public textToCopy?: string | null;

  /**
   * How to handle overflow of the cell content:
   * * `true` = truncate with ellipsis
   * * `false` = break into a new line
   */
  @Input()
  public truncate = false;

  /** Show a copy-to-clipboard button in the wrapper */
  @Input()
  public withCopyBtn = false;

  // Inputs to be forward to button-copy-to-clipboard

  /** Whether the button is disabled (blocked) */
  @Input()
  public btnDisabled = false;

  /**
   * Height in pixels for the button. Includes the border size if `[btnWithBorder]="true"`.
   *
   * If not provided, then a value from the `btnSizePx` input is used instead.
   */
  @Input()
  public btnHeightPx?: number;

  /** Size (width & height) in pixels for icons and spinners inside of the button */
  @Input()
  public btnIconSizePx: number = BUTTON_DEFAULTS.iconSizePx;

  /** An optional text label for the default state */
  @Input()
  public btnLabel?: string;

  /**
   * Font size for the label set by the `btnLabel` input.
   *
   * If not provided, then a value from the global Clarity styles is used.
   */
  @Input()
  public btnLabelFontSizePx?: number;

  /**
   * Size (width & height) in pixels.
   *
   * NOTE: The inputs `btnWidthPx` and `btnHeightPx` have higher priority and override the according dimension.
   */
  @Input()
  public btnSizePx: number = BUTTON_DEFAULTS.buttonSizePx;

  /** A string to be shown as a tooltip on hovering the button */
  @Input()
  public btnTitle: string;

  /**
   * Width in pixels for the button. Includes the border size if `[btnWithBorder]="true"`.
   *
   * If not provided, then a value from the `btnSizePx` input is used instead.
   */
  @Input()
  public btnWidthPx?: number;

  /** Whether to use animation inside the button */
  @Input()
  public btnWithAnimation = true;

  /** Whether to show a border around the button */
  @Input()
  public btnWithBorder = false;

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
