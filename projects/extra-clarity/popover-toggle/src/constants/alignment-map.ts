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

/**
 * Fallback order for a given content position: the configured side first, then its mirror,
 * then the two perpendicular sides.
 *
 * Clarity's own `DROPDOWN_POSITIONS` list is ordered bottom-first for every placement, so a
 * Left- or Right-positioned popover that does not fit would drop below the anchor before it
 * tried flipping to the opposite side. Deriving the order from `contentPosition` keeps the
 * mirror as the first fallback, and keeps every position on the same `POPOVER_OFFSET_PX` gap.
 */
const FALLBACK_ORDER: Record<EcContentPosition, readonly EcContentPosition[]> = {
  [EcContentPosition.Bottom]: [
    EcContentPosition.Bottom,
    EcContentPosition.Top,
    EcContentPosition.Right,
    EcContentPosition.Left,
  ],
  [EcContentPosition.Top]: [
    EcContentPosition.Top,
    EcContentPosition.Bottom,
    EcContentPosition.Right,
    EcContentPosition.Left,
  ],
  [EcContentPosition.Left]: [
    EcContentPosition.Left,
    EcContentPosition.Right,
    EcContentPosition.Bottom,
    EcContentPosition.Top,
  ],
  [EcContentPosition.Right]: [
    EcContentPosition.Right,
    EcContentPosition.Left,
    EcContentPosition.Bottom,
    EcContentPosition.Top,
  ],
};

/**
 * Positions handed to CDK as `[preferred, ...fallbacks]`, in the order they should be tried
 * when the preferred one does not fit in the viewport.
 */
export function getConnectedPositions(
  contentPosition: EcContentPosition,
  align: EcAnchorToContentAlign,
): ConnectedPosition[] {
  return FALLBACK_ORDER[contentPosition].map((position) => getConnectedPosition(position, align));
}
