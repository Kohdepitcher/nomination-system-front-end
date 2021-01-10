import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNominationsComponent } from './all-nominations.component';

describe('AllNominationsComponent', () => {
  let component: AllNominationsComponent;
  let fixture: ComponentFixture<AllNominationsComponent>;

  beforeEach(async(() => {
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
