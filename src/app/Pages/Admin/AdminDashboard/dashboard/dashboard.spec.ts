import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminService } from '../../../../Service/Admin/admin-service';

import { Dashboard } from './dashboard';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let requestedEarningId: number | undefined;

  beforeEach(async () => {
    requestedEarningId = undefined;
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [{
        provide: AdminService,
        useValue: {
          getEarning: () => of({ data: { TotalUser: [{ earningId: 23, mouth: 'January', totalEarning: 450 }] } }),
          getEarningEntry: (earningId: number) => {
            requestedEarningId = earningId;
            return of([{ amount: 450 }]);
          },
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the selected earning entry and closes its table', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const monthButton = fixture.nativeElement.querySelector('.chart-column') as HTMLButtonElement;
    monthButton.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(requestedEarningId).toBe(23);
    expect(fixture.nativeElement.querySelector('tbody')?.textContent).toContain('450');

    const closeButton = fixture.nativeElement.querySelector('.close-button') as HTMLButtonElement;
    closeButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.entry-section')).toBeNull();
    expect(component.earningEntry).toEqual([]);
  });
});
