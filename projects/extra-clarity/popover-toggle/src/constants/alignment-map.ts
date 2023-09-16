import { ClrAlignment } from '@clr/angular';

import { PopoverAlign } from '../types';

export const clrAlignmentMap: Record<PopoverAlign, ClrAlignment> = {
  start: ClrAlignment.START,
  center: ClrAlignment.CENTER,
  end: ClrAlignment.END,
};
