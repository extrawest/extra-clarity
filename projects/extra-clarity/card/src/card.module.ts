import { EcCardComponent } from './card.component';
import {
  EcCardFooterDirective,
  EcCardHeaderActionsDirective,
  EcCardHeaderTitleDirective,
} from './directives';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EcCardModule = [
  EcCardComponent,
  EcCardFooterDirective,
  EcCardHeaderActionsDirective,
  EcCardHeaderTitleDirective,
] as const;
