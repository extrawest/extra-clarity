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
  @Input() truncate = false;
  @Input() withCopyBtn = false;
  @Input() btnInline = false;
  @Input() textToCopy?: string | undefined;

  @Output() copied = new EventEmitter<string>();
  @Output() failed = new EventEmitter<unknown>();
}
