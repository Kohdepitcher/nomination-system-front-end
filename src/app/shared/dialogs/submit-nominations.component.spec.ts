import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubmitNominationsComponent } from './submit-nominations.component';

describe('SubmitNominationsComponent', () => {
  let component: SubmitNominationsComponent;
  let fixture: ComponentFixture<SubmitNominationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitNominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
