import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseDialogContainerComponent } from './base-dialog-container.component';

describe('BaseDialogContainerComponent', () => {
  let component: BaseDialogContainerComponent;
  let fixture: ComponentFixture<BaseDialogContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseDialogContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseDialogContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
