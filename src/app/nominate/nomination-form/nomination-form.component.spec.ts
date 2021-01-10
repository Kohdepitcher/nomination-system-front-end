import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationFormComponent } from './nomination-form.component';

describe('NominationFormComponent', () => {
  let component: NominationFormComponent;
  let fixture: ComponentFixture<NominationFormComponent>;

  beforeEach(async(() => {
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
