import { EcCardComponent } from './card.component';
import {
  EcCardBlockDirective,
  EcCardFooterDirective,
  EcCardHeaderDirective,
  EcCardTitleDirective,
} from './directives';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EcCardModule = [
  EcCardComponent,
  EcCardHeaderDirective,
  EcCardTitleDirective,
  EcCardBlockDirective,
  EcCardFooterDirective,
] as const;
