import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NominationFormComponent } from './nomination-form.component';

describe('NominationFormComponent', () => {
  let component: NominationFormComponent;
  let fixture: ComponentFixture<NominationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
