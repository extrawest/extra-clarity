import {Component, Input} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

const example1 = `
  <ec-card
    [title]="title"
    [empty]="empty"
    [loading]="loading"
    [error]="error"
  >
    ...

    <ec-card-footer>
        ...
    </ec-card-footer>
  </ec-card>`

@Component({
  selector: 'storybook-card',
  templateUrl: './card.component.html',
})
export class CardStoryComponent {
  @Input() title?: string;

  @Input() empty?: boolean;
  @Input() loading?: boolean;
  @Input() error?: HttpErrorResponse | null;

  readonly users = [{
    id: 1,
    name: 'Test 1',
    creation: Date.now(),
  }, {
    id: 2,
    name: 'Test 2',
    creation: Date.now(),
  }, {
    id: 3,
    name: 'Test 3',
    creation: Date.now(),
  }];

  readonly example1 = example1;
}
