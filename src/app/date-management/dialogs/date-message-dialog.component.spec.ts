import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DateMessageDialogComponent } from './date-message-dialog.component';

describe('DateMessageDialogComponent', () => {
  let component: DateMessageDialogComponent;
  let fixture: ComponentFixture<DateMessageDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DateMessageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
