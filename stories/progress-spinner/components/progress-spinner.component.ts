import {Component} from '@angular/core';

const HTML_EXAMPLE = `
<div class="clr-row">
    <div class="clr-col-6">
        <div class="card">
            <progress-spinner [showSpinner]="cardLoadingState"></progress-spinner>
            ...
        </div>
    </div>
</div>
<button class="btn btn-primary" (click)="cardLoadingState = !cardLoadingState">Toggle Loading</button>
`;

const HTML_EXAMPLE2 = `
<div>
  <progress-spinner [showSpinner]="loadingState" clrSize="md"></progress-spinner>
  <h2>Content Title</h2>
    <p>...</p>
</div>
<button class="btn btn-primary" (click)="loadingState = !loadingState">Toggle Loading</button>
`;

@Component({
  selector: 'storybook-progress-spinner',
  templateUrl: './progress-spinner.component.html',
})
export class ProgressSpinnerStoryComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExample2 = HTML_EXAMPLE2;

  loadingState: boolean;
  cardLoadingState: boolean;
}
