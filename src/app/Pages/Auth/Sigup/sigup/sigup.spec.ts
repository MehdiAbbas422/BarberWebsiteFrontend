import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sigup } from './sigup';

describe('Sigup', () => {
  let component: Sigup;
  let fixture: ComponentFixture<Sigup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sigup],
    }).compileComponents();

    fixture = TestBed.createComponent(Sigup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
