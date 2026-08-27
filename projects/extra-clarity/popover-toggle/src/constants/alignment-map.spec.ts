import { describe, expect, it } from 'vitest';

import { EcAnchorToContentAlign, EcContentPosition } from '../enums';

import { POPOVER_OFFSET_PX, getConnectedPosition } from './alignment-map';

const HORIZONTAL_ALIGNS = [
  [EcAnchorToContentAlign.StartToStart, 'start', 'start'],
  [EcAnchorToContentAlign.StartToCenter, 'start', 'center'],
  [EcAnchorToContentAlign.StartToEnd, 'start', 'end'],
  [EcAnchorToContentAlign.CenterToStart, 'center', 'start'],
  [EcAnchorToContentAlign.CenterToCenter, 'center', 'center'],
  [EcAnchorToContentAlign.CenterToEnd, 'center', 'end'],
  [EcAnchorToContentAlign.EndToStart, 'end', 'start'],
  [EcAnchorToContentAlign.EndToCenter, 'end', 'center'],
  [EcAnchorToContentAlign.EndToEnd, 'end', 'end'],
] as const;

const VERTICAL_ALIGNS = [
  [EcAnchorToContentAlign.StartToStart, 'top', 'top'],
  [EcAnchorToContentAlign.StartToCenter, 'top', 'center'],
  [EcAnchorToContentAlign.StartToEnd, 'top', 'bottom'],
  [EcAnchorToContentAlign.CenterToStart, 'center', 'top'],
  [EcAnchorToContentAlign.CenterToCenter, 'center', 'center'],
  [EcAnchorToContentAlign.CenterToEnd, 'center', 'bottom'],
  [EcAnchorToContentAlign.EndToStart, 'bottom', 'top'],
  [EcAnchorToContentAlign.EndToCenter, 'bottom', 'center'],
  [EcAnchorToContentAlign.EndToEnd, 'bottom', 'bottom'],
] as const;

describe('getConnectedPosition', () => {
  it('maps bottom alignments onto originX/overlayX with a downward offset', () => {
    for (const [align, originX, overlayX] of HORIZONTAL_ALIGNS) {
      expect(getConnectedPosition(EcContentPosition.Bottom, align)).toEqual({
        originX,
        originY: 'bottom',
        overlayX,
        overlayY: 'top',
        offsetX: 0,
        offsetY: POPOVER_OFFSET_PX,
      });
    }
  });

  it('maps top alignments onto originX/overlayX with an upward offset', () => {
    for (const [align, originX, overlayX] of HORIZONTAL_ALIGNS) {
      expect(getConnectedPosition(EcContentPosition.Top, align)).toEqual({
        originX,
        originY: 'top',
        overlayX,
        overlayY: 'bottom',
        offsetX: 0,
        offsetY: -POPOVER_OFFSET_PX,
      });
    }
  });

  it('maps left alignments onto originY/overlayY with a leftward offset', () => {
    for (const [align, originY, overlayY] of VERTICAL_ALIGNS) {
      expect(getConnectedPosition(EcContentPosition.Left, align)).toEqual({
        originX: 'start',
        originY,
        overlayX: 'end',
        overlayY,
        offsetX: -POPOVER_OFFSET_PX,
        offsetY: 0,
      });
    }
  });

  it('maps right alignments onto originY/overlayY with a rightward offset', () => {
    for (const [align, originY, overlayY] of VERTICAL_ALIGNS) {
      expect(getConnectedPosition(EcContentPosition.Right, align)).toEqual({
        originX: 'end',
        originY,
        overlayX: 'start',
        overlayY,
        offsetX: POPOVER_OFFSET_PX,
        offsetY: 0,
      });
    }
  });
});
