import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserName } from './change-user-name';

describe('ChangeUserName', () => {
  let component: ChangeUserName;
  let fixture: ComponentFixture<ChangeUserName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserName],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUserName);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
