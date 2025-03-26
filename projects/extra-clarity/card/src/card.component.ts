import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  contentChild,
  input,
  output,
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
    '[class.empty]': 'empty()',
    '[class.loading]': 'loading()',
    '[class.has-error]': 'error()',
  },
})
export class EcCardComponent implements OnInit {
  public readonly title = input<string>();

  public readonly empty = input<boolean>();

  public readonly loading = input<boolean>();

  public readonly error = input<EcCardError | null>();

  public readonly spinnerSize = input<'sm' | 'md' | 'lg'>('sm');

  /** `EventEmitter<void>` */
  public readonly reload = output<void>();

  protected readonly footerContent = contentChild(EcCardFooterDirective);
  protected readonly headerActionsContent = contentChild(EcCardHeaderActionsDirective);
  protected readonly headerTitleContent = contentChild(EcCardHeaderTitleDirective);

  protected showErrorDetails = false;
  protected unknownError = this.commonStrings.keys.card.unknownError;

  protected get errorMessage(): string {
    const error = this.error();
    if (!error) {
      return this.unknownError;
    }
    if (error.message) {
      return error.message;
    }
    if (!error.httpError) {
      return this.unknownError;
    }
    if (!error.httpError.error) {
      const { status, statusText } = error.httpError;
      return `[${status}] ${statusText}`;
    }
    if (typeof error.httpError.error === 'object') {
      return JSON.stringify(error.httpError.error, undefined, ' ');
    }
    return error.httpError.error;
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
