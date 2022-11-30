import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lib-processing-button',
  templateUrl: './processing-button.component.html',
  styleUrls: ['./processing-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessingButtonComponent {
  loading = false;
}
