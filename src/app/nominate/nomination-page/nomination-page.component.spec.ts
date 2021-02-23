import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NominationPageComponent } from './nomination-page.component';

describe('NominationPageComponent', () => {
  let component: NominationPageComponent;
  let fixture: ComponentFixture<NominationPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
