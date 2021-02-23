import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DateListComponent } from './date-list.component';

describe('DateListComponent', () => {
  let component: DateListComponent;
  let fixture: ComponentFixture<DateListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
