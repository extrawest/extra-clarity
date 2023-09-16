import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ClrAxis,
  ClrPopoverEventsService,
  ÇlrClrPopoverModuleNext as ClrPopoverModuleNext,
  ClrPopoverPosition,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
  ClrSide,
} from '@clr/angular';
import { uniqueIdFactory } from '@extrawest/extra-clarity/utils';
import { Subject, takeUntil } from 'rxjs';

import { clrAlignmentMap } from './constants';
import { CdkTrapFocusDirective } from './directives';
import { AnchorToContentAlign, ContentPosition } from './enums';
import { PopoverAlign } from './types';

@Component({
  selector: 'ec-popover-toggle',
  templateUrl: './popover-toggle.component.html',
  styleUrls: ['./popover-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    CdkTrapFocusDirective,
    ClrPopoverModuleNext,
  ],
  providers: [
    ClrPopoverEventsService,
    ClrPopoverPositionService,
    ClrPopoverToggleService,
  ],
})
export class PopOverToggleComponent implements OnChanges, OnDestroy {
  @Input()
  public anchorToContentAlign: AnchorToContentAlign = AnchorToContentAlign.StartToStart;

  @Input()
  public contentPosition: ContentPosition = ContentPosition.Bottom;

  @Input()
  public closeOnClickOutside: boolean = true;

  @Input()
  public closeOnScroll: boolean = true;

  @Input()
  public labelText: string = '';

  @Input()
  public labelTmplRef?: TemplateRef<unknown>;

  @Output()
  public openChange: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('anchor', { static: true })
  protected anchor?: ElementRef<HTMLButtonElement>;

  protected readonly popoverId = uniqueIdFactory();
  protected isOpen = false;
  protected popoverPosition: ClrPopoverPosition;

  private readonly destroy$ = new Subject<void>();

  constructor(private clrPopoverToggleService: ClrPopoverToggleService) {
    this.popoverPosition = this.getPopoverPosition();

    this.clrPopoverToggleService.openChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => {
        if (this.isOpen === isOpen) return;

        if (!isOpen) {
          this.anchor?.nativeElement.focus();
        }
        this.openChange.emit(isOpen);
        this.isOpen = isOpen;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentPosition'] || changes['anchorToContentAlign']) {
      this.popoverPosition = this.getPopoverPosition();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getPopoverPosition(): ClrPopoverPosition {
    return {
      ...this.getClrPopoverAxisAndSide(this.contentPosition),
      ...this.getClrPopoverAnchorAndContent(this.anchorToContentAlign),
    };
  }

  private getClrPopoverAnchorAndContent(
    align: AnchorToContentAlign,
  ): Pick<ClrPopoverPosition, 'anchor' | 'content'> {
    const [anchor, content] = align.split('-');

    return {
      anchor: clrAlignmentMap[anchor as PopoverAlign],
      content: clrAlignmentMap[content as PopoverAlign],
    };
  }

  private getClrPopoverAxisAndSide(
    position: ContentPosition,
  ): Pick<ClrPopoverPosition, 'axis' | 'side'> {
    const axis = (position === ContentPosition.Bottom || position === ContentPosition.Top)
      ? ClrAxis.VERTICAL
      : ClrAxis.HORIZONTAL;

    const side = (position === ContentPosition.Bottom || position === ContentPosition.Right)
      ? ClrSide.AFTER
      : ClrSide.BEFORE;

    return { axis, side };
  }
}
