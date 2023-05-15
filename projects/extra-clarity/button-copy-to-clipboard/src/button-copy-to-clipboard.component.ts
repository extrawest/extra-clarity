import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, copyIcon } from '@cds/core/icon';
import { ClrLoadingState } from '@clr/angular';

import { animations } from './button-copy-to-clipboard.animations';

ClarityIcons.addIcons(copyIcon);

@Component({
  selector: 'app-button-copy-to-clipboard',
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
export class ButtonCopyToClipboardComponent {
  @HostBinding('@.disabled') disableAnimation = false;

  @Input() set noAnimation(disable: boolean) {
    this.disableAnimation = disable;
  }

  @Input() disabled = false;
  @Input() noVerticalMargins = true;
  @Input() small = true;
  @Input() textToCopy?: string | undefined;
  @Input() title?: string;
  @Input() withBorder = false;

  @Output() copied = new EventEmitter<string>();
  @Output() failed = new EventEmitter<unknown>();

  btnLoadingState: ClrLoadingState = ClrLoadingState.DEFAULT;

  readonly clrLoadingState = ClrLoadingState;

  constructor(private changeDetectionRef: ChangeDetectorRef) {
  }

  copy(): void {
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

  resetToDefaultState(): void {
    this.btnLoadingState = ClrLoadingState.DEFAULT;
  }
}
