import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmploymangment } from './admin-employmangment';

describe('AdminEmploymangment', () => {
  let component: AdminEmploymangment;
  let fixture: ComponentFixture<AdminEmploymangment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmploymangment],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEmploymangment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
