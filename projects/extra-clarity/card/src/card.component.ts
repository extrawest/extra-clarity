import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  contentChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClarityIcons, errorStandardIcon } from '@cds/core/icon';
import { ClrIconModule } from '@clr/angular';

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
  imports: [JsonPipe, ClrIconModule, ProgressSpinnerComponent],
  host: {
    class: 'card',
    '[class.empty]': 'empty',
    '[class.loading]': 'loading',
    '[class.has-error]': 'error',
  },
})
export class EcCardComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public empty: boolean;

  @Input()
  public loading: boolean;

  @Input()
  public error: EcCardError | null;

  @Input()
  public spinnerSize: 'sm' | 'md' | 'lg' = 'sm';

  /** `EventEmitter<void>` */
  @Output()
  public reload = new EventEmitter<void>();

  protected readonly footerContent = contentChild(EcCardFooterDirective);
  protected readonly headerActionsContent = contentChild(EcCardHeaderActionsDirective);
  protected readonly headerTitleContent = contentChild(EcCardHeaderTitleDirective);

  protected showErrorDetails = false;
  protected unknownError = this.commonStrings.keys.card.unknownError;

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

  constructor(
    protected readonly commonStrings: EcCommonStringsService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly destroyRef: DestroyRef,
  ) {
    ClarityIcons.addIcons(errorStandardIcon);
  }

  protected onReload(): void {
    this.reload.emit();
    this.showErrorDetails = false;
  }

  protected toggleErrorDetailsVisibility(): void {
    this.showErrorDetails = !this.showErrorDetails;
  }

  ngOnInit(): void {
    this.commonStrings.stringsChanged$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.changeDetectorRef.markForCheck());
  }
}
