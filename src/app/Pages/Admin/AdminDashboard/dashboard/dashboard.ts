import { DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';
import { ChangeDetectorRef } from '@angular/core';
// Strongly-typed interfaces
export interface EarningSummary {
  earningId: number;
  mouth: string;
  totalEarning: number;
}

export interface EarningEntry {
  billId: number;
  baberEmail: string;
  barberName: string;
  date: string;
  time: string;
  totalBill: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private readonly adminService = inject(AdminService);
  private readonly cdr = inject(ChangeDetectorRef);

  earnings: EarningSummary[] = [];
  earningEntries: EarningEntry[] = [];
  totalCustomers: number = 0;
  ManualEntryDto :any[]= [] 
  isEarningEntryVisible = false;
  isLoadingEntry = false;
  PageName:string = 'Entry'
  errorMessage = '';

  ngOnInit(): void {
    this.adminService.getEarning().subscribe({
      next: (res: any) => {
        console.log(res)
        // Simple direct mapping
        this.earnings = res.data ;
        this.totalCustomers = res.totalCustumer || 0;
        this.cdr.detectChanges()
      },
      error: (err:any) => {
        console.log(err)
        this.errorMessage = 'Unable to load earnings.';
      }
    });
  }

  // Bar Chart ke max height ke liye
  get maximumEarning(): number {
    if (this.earnings.length === 0) return 1;
    return Math.max(...this.earnings.map(e => e.totalEarning));
  }

  // Month Click Handler
  selectMonth(earningId: number): void {
    this.isLoadingEntry = true;
    this.isEarningEntryVisible = false;
    this.earningEntries = [] 
    this.errorMessage = '';

    this.adminService.getEarningEntry(earningId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.earningEntries = res.data1 || [];
        this.ManualEntryDto = res.data2 || [];
        this.isLoadingEntry = false;
        this.isEarningEntryVisible = true;
        this.cdr.detectChanges()
      },
      error: (err:any) => {
        console.log(err)
        this.isLoadingEntry = false;
        this.errorMessage = 'Unable to load earning entries.';
      }
    });
  }

  closeEarningEntry(): void {
    this.earningEntries = [];
    this.isEarningEntryVisible = false;
  }

  ChangeEntries(Name:string)
  {
      this.isLoadingEntry = true
      this.PageName = Name
      this.isLoadingEntry = false
  }

}