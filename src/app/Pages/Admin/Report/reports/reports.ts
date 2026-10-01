import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';

@Component({
  selector: 'app-reports',
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  reports: any[] = [];
  keyword = '';
  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  hasNextPage = false;
  Isloading = false;

  get PageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.GetReports();
  }

  GetReports(): void {
    this.Isloading = true;
    this.adminService.GetReport(this.keyword, this.page).subscribe({
      next: (res: any) => {
        console.log(res);
        this.reports = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.page = res?.pageNumber ?? this.page;
        this.pageSize = res?.pageSize ?? this.pageSize;
        this.totalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.reports.length) / this.pageSize));
        this.totalRecords = res?.totalRecords ?? this.reports.length;
        this.hasNextPage = this.page < this.totalPages;
        
        this.Isloading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.Isloading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }

  SearchReports(keyword: string): void {
    this.keyword = keyword;
    this.page = 1;
    this.GetReports();
  }

  ChangePage(direction: number): void {
    if (this.Isloading) return;

    const nextPage = this.page + direction;
    if (nextPage < 1 || nextPage > this.totalPages) return;

    this.page = nextPage;
    this.GetReports();
  }

  DeleteReport(reportId: number): void {
    if (this.Isloading) return;
    this.Isloading = true;

    this.adminService.DeleteReport(reportId).subscribe({
      next: (res: any) => {
        this.GetReports();
      },
      error: (err: any) => {
        this.Isloading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}