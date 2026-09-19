import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageService } from './manage-service';

describe('ManageService', () => {
  let component: ManageService;
  let fixture: ComponentFixture<ManageService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageService],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
