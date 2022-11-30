import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingButtonComponent } from './processing-button.component';

describe('ProcessingButtonComponent', () => {
  let component: ProcessingButtonComponent;
  let fixture: ComponentFixture<ProcessingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
