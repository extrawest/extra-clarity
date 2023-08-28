import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, errorStandardIcon } from '@cds/core/icon';
import { ProgressSpinnerComponent } from '@extrawest/extra-clarity/progress-spinner';

import {
  EcCardBlockDirective,
  EcCardFooterDirective,
  EcCardHeaderDirective,
  EcCardTitleDirective,
} from './directives';
import { EcCardError } from './interfaces';

const UNKNOWN_ERROR = 'Unknown Error';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    ProgressSpinnerComponent,
    EcCardBlockDirective,
    EcCardFooterDirective,
    EcCardHeaderDirective,
    EcCardTitleDirective,
  ],
})
export class EcCardComponent {
  @Input()
  public title: string;

  @Input()
  public empty: boolean;

  @Input()
  public loading: boolean;

  @Input()
  public error: EcCardError | null;

  /** `EventEmitter<void>` */
  @Output()
  public reload = new EventEmitter<void>();

  protected showErrorDetails = false;

  protected get errorMessage(): string {
    if (!this.error) {
      return UNKNOWN_ERROR;
    }
    if (this.error.message) {
      return this.error.message;
    }
    if (!this.error.httpError) {
      return UNKNOWN_ERROR;
    }
    if (!this.error.httpError.error) {
      const { status, statusText } = this.error.httpError;
      return `[${status}] ${statusText}`;
    }
    if (typeof this.error.httpError.error === 'object') {
      return JSON.stringify(this.error.httpError.error, undefined, ' ');
    }
    return this.error.httpError.error;
  }

  constructor() {
    ClarityIcons.addIcons(errorStandardIcon);
  }

  protected onReload(): void {
    this.reload.emit();
    this.showErrorDetails = false;
  }

  protected toggleErrorDetailsVisibility(): void {
    this.showErrorDetails = !this.showErrorDetails;
  }
}
