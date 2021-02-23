import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NominationsComponent } from './nominations.component';

describe('NominationsComponent', () => {
  let component: NominationsComponent;
  let fixture: ComponentFixture<NominationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
