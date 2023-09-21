import { ClrAlignment } from '@clr/angular';

import { EcPopoverAlign } from '../types';

export const clrAlignmentMap: Record<EcPopoverAlign, ClrAlignment> = {
  start: ClrAlignment.START,
  center: ClrAlignment.CENTER,
  end: ClrAlignment.END,
};
