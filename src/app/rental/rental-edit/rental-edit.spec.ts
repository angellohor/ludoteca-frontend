import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalEdit } from './rental-edit';

describe('RentalEdit', () => {
  let component: RentalEdit;
  let fixture: ComponentFixture<RentalEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
