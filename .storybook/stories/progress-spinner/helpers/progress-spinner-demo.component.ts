import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressSpinnerComponent } from '../../../../projects/extra-clarity/progress-spinner';

const CODE_EXAMPLES: readonly string[] = [
`
<div class="clr-row">
    <div class="clr-col-6">
        <div class="card">
            <progress-spinner [showSpinner]="cardLoadingState"></progress-spinner>
            ...
        </div>
    </div>
</div>
<button class="btn btn-primary" (click)="cardLoadingState = !cardLoadingState">Toggle Loading</button>
`,
`
<div>
  <progress-spinner [showSpinner]="loadingState" clrSize="md"></progress-spinner>
  <h2>Content Title</h2>
    <p>...</p>
</div>
<button class="btn btn-primary" (click)="loadingState = !loadingState">Toggle Loading</button>
`,
];

@Component({
  selector: 'ec-storybook-progress-spinner',
  templateUrl: './progress-spinner-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ProgressSpinnerComponent,
  ],
})
export class ProgressSpinnerDemoComponent {
  protected codeExamples = CODE_EXAMPLES;

  protected loadingState: boolean;
  protected cardLoadingState: boolean;
}
