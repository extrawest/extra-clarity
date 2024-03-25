import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, errorStandardIcon } from '@cds/core/icon';
import { EcCommonStringsService } from '@extrawest/extra-clarity/i18n';
import { ProgressSpinnerComponent } from '@extrawest/extra-clarity/progress-spinner';

import {
  EcCardFooterDirective,
  EcCardHeaderActionsDirective,
  EcCardHeaderTitleDirective,
} from './directives';
import { EcCardError } from './interfaces';

@Component({
  selector: 'ec-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdsIconModule,
    EcCardFooterDirective,
    EcCardHeaderActionsDirective,
    EcCardHeaderTitleDirective,
    ProgressSpinnerComponent,
  ],
  host: {
    class: 'card',
    '[class.empty]': 'empty',
    '[class.loading]': 'loading',
    '[class.has-error]': 'error',
  },
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

  @ContentChild(EcCardFooterDirective)
  protected footerContent?: EcCardFooterDirective;

  @ContentChild(EcCardHeaderActionsDirective)
  protected headerActionsContent?: EcCardHeaderActionsDirective;

  @ContentChild(EcCardHeaderTitleDirective)
  protected headerTitleContent?: EcCardHeaderTitleDirective;

  protected showErrorDetails = false;
  protected unknownError = this.commonStrings.keys.card.unknownError

  protected get errorMessage(): string {
    if (!this.error) {
      return this.unknownError;
    }
    if (this.error.message) {
      return this.error.message;
    }
    if (!this.error.httpError) {
      return this.unknownError;
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

  constructor(public readonly commonStrings: EcCommonStringsService) {
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
