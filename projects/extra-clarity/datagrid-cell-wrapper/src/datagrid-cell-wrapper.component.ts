import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonCopyToClipboardComponent } from '@extrawest/extra-clarity/button-copy-to-clipboard';

@Component({
  selector: 'ec-dg-cell-wrapper',
  templateUrl: './datagrid-cell-wrapper.component.html',
  styleUrls: ['./datagrid-cell-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonCopyToClipboardComponent,
  ],
})
export class DatagridCellWrapperComponent {
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

  /**
   * Emits a `string` successfully copied to the clipboard
   * by pressing the copy-to-clipboard button
   */
  @Output()
  public copied = new EventEmitter<string>();

  /**
   * Emits an `unknown` value if copying to the clipboard failed.
   *
   * Caught from `navigator.clipboard.writeText()`.
   */
  @Output()
  public failed = new EventEmitter<unknown>();
}
