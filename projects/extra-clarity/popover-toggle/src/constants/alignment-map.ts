import { type ConnectedPosition } from '@angular/cdk/overlay';

import { EcAnchorToContentAlign, EcContentPosition } from '../enums';
import { type EcPopoverAlign } from '../types';

/** Matches Clarity 18 dropdown popover offset (`ClrPopoverType.DROPDOWN`). */
export const POPOVER_OFFSET_PX = 2;

const HORIZONTAL: Record<EcPopoverAlign, ConnectedPosition['originX']> = {
  start: 'start',
  center: 'center',
  end: 'end',
};

const VERTICAL: Record<EcPopoverAlign, ConnectedPosition['originY']> = {
  start: 'top',
  center: 'center',
  end: 'bottom',
};

function withOffset(
  position: Omit<ConnectedPosition, 'offsetX' | 'offsetY'>,
  contentPosition: EcContentPosition,
): ConnectedPosition {
  switch (contentPosition) {
    case EcContentPosition.Top:
      return { ...position, offsetX: 0, offsetY: -POPOVER_OFFSET_PX };
    case EcContentPosition.Left:
      return { ...position, offsetX: -POPOVER_OFFSET_PX, offsetY: 0 };
    case EcContentPosition.Right:
      return { ...position, offsetX: POPOVER_OFFSET_PX, offsetY: 0 };
    case EcContentPosition.Bottom:
    default:
      return { ...position, offsetX: 0, offsetY: POPOVER_OFFSET_PX };
  }
}

/**
 * Map Extra Clarity's content-position + corner-alignment API onto CDK overlay
 * positions used by Clarity 18 popovers.
 */
export function getConnectedPosition(
  contentPosition: EcContentPosition,
  align: EcAnchorToContentAlign,
): ConnectedPosition {
  const [anchor, content] = align.split('-') as [EcPopoverAlign, EcPopoverAlign];

  switch (contentPosition) {
    case EcContentPosition.Top:
      return withOffset(
        {
          originX: HORIZONTAL[anchor],
          originY: 'top',
          overlayX: HORIZONTAL[content],
          overlayY: 'bottom',
        },
        contentPosition,
      );
    case EcContentPosition.Left:
      return withOffset(
        {
          originX: 'start',
          originY: VERTICAL[anchor],
          overlayX: 'end',
          overlayY: VERTICAL[content],
        },
        contentPosition,
      );
    case EcContentPosition.Right:
      return withOffset(
        {
          originX: 'end',
          originY: VERTICAL[anchor],
          overlayX: 'start',
          overlayY: VERTICAL[content],
        },
        contentPosition,
      );
    case EcContentPosition.Bottom:
    default:
      return withOffset(
        {
          originX: HORIZONTAL[anchor],
          originY: 'bottom',
          overlayX: HORIZONTAL[content],
          overlayY: 'top',
        },
        contentPosition,
      );
  }
}
