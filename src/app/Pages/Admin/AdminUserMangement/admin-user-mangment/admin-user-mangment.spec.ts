import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserMangment } from './admin-user-mangment';

describe('AdminUserMangment', () => {
  let component: AdminUserMangment;
  let fixture: ComponentFixture<AdminUserMangment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserMangment],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserMangment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
