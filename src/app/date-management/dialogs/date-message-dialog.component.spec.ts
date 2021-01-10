import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateMessageDialogComponent } from './date-message-dialog.component';

describe('DateMessageDialogComponent', () => {
  let component: DateMessageDialogComponent;
  let fixture: ComponentFixture<DateMessageDialogComponent>;

  beforeEach(async(() => {
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
