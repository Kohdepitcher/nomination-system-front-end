import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNominationDialogComponent } from './edit-nomination-dialog.component';

describe('EditNominationDialogComponent', () => {
  let component: EditNominationDialogComponent;
  let fixture: ComponentFixture<EditNominationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNominationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNominationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
