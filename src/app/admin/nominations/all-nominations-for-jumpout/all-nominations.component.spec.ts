import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllNominationsComponent } from './all-nominations.component';

describe('AllNominationsComponent', () => {
  let component: AllNominationsComponent;
  let fixture: ComponentFixture<AllNominationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllNominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
