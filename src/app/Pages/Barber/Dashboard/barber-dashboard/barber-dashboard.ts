import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../../../../Service/Auth/authentication';
import { BarberService } from '../../../../Service/Barber/barber-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageModalService } from '../../../../shared/message-modal.service';

@Component({
  selector: 'app-barber-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './barber-dashboard.html',
  styleUrl: './barber-dashboard.css',
})
export class BarberDashboard implements OnInit {

  Time = '';
  BookedId: number = 0;

  BookingPage: string = 'BookingRequest';
  ApprovedButton: boolean = false;

  // General action loading
  Isloading: boolean = false;

  // Separate loading states so one pagination cannot block the other.
  RequestLoading: boolean = false;
  ApprovedLoading: boolean = false;
DontComeCustomer1 = false
  BookingRequestDto: any[] = [];
  ApprovedBookingRequestDto: any[] = [];

  Bill: any = null;
  BillId: number = 0;
  BillModal: boolean = false;

  // =====================================================
  // REQUEST PAGINATION
  // =====================================================
  RequestPage: number = 1;
  RequestPageSize: number = 10;
  RequestTotalPages: number = 1;
  RequestTotalRecords: number = 0;

  // =====================================================
  // APPROVED PAGINATION
  // =====================================================
  ApprovedPage: number = 1;
  ApprovedPageSize: number = 10;
  ApprovedTotalPages: number = 1;
  ApprovedTotalRecords: number = 0;

  // Show a compact pagination list instead of rendering hundreds of buttons.
  get RequestPageNumbers(): number[] {
    return this.GetVisiblePages(this.RequestPage, this.RequestTotalPages);
  }

  get ApprovedPageNumbers(): number[] {
    return this.GetVisiblePages(this.ApprovedPage, this.ApprovedTotalPages);
  }

  get RequestRecordStart(): number {
    if (this.RequestTotalRecords === 0) return 0;
    return ((this.RequestPage - 1) * this.RequestPageSize) + 1;
  }

  get RequestRecordEnd(): number {
    return Math.min(
      this.RequestPage * this.RequestPageSize,
      this.RequestTotalRecords
    );
  }

  get ApprovedRecordStart(): number {
    if (this.ApprovedTotalRecords === 0) return 0;
    return ((this.ApprovedPage - 1) * this.ApprovedPageSize) + 1;
  }

  get ApprovedRecordEnd(): number {
    return Math.min(
      this.ApprovedPage * this.ApprovedPageSize,
      this.ApprovedTotalRecords
    );
  }

  constructor(
    private routes: Router,
    private auth: Authentication,
    private barber: BarberService,
    private cdr: ChangeDetectorRef,
    private messageModal: MessageModalService
  ) {}

  ngOnInit(): void {
    // Both calls are independent. Their loading states are also independent.
    this.GetBookedRequest();
    this.GetApprovedCustumer();
  }

  logout(): void {
    this.auth.Logout();
    this.routes.navigate(['/sigin']);
  }

  // =====================================================
  // PAGINATION HELPER
  // =====================================================

  private GetVisiblePages(currentPage: number, totalPages: number): number[] {
    totalPages = Math.max(1, Number(totalPages) || 1);
    currentPage = Math.min(
      Math.max(1, Number(currentPage) || 1),
      totalPages
    );

    // 1 ... 4 5 6 ... 20 style pagination.
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>();

    pages.add(1);
    pages.add(totalPages);
    pages.add(currentPage);
    pages.add(currentPage - 1);
    pages.add(currentPage + 1);

    if (currentPage <= 4) {
      pages.add(2);
      pages.add(3);
      pages.add(4);
      pages.add(5);
    }

    if (currentPage >= totalPages - 3) {
      pages.add(totalPages - 4);
      pages.add(totalPages - 3);
      pages.add(totalPages - 2);
      pages.add(totalPages - 1);
    }

    return Array.from(pages)
      .filter(page => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
  }

  // =====================================================
  // BOOKING REQUESTS
  // =====================================================

  GetBookedRequest(): void {
    if (this.RequestLoading) return;

    this.RequestLoading = true;

    this.barber.GetBookingRequest(this.RequestPage).subscribe({
      next: (res: any) => {
        console.log('Booking Request Response:', res);

        const data = this.ExtractData(res);

        this.BookingRequestDto = data;

        this.RequestPageSize = this.GetPositiveNumber(
          res?.pageSize ?? res?.PageSize,
          this.RequestPageSize
        );

        this.RequestTotalRecords = Math.max(
          0,
          this.GetNumber(
            res?.totalRecords ?? res?.TotalRecords ?? res?.totalCount ?? res?.TotalCount,
            data.length
          )
        );

        const calculatedTotalPages = Math.max(
          1,
          Math.ceil(this.RequestTotalRecords / this.RequestPageSize)
        );

        this.RequestTotalPages = Math.max(
          1,
          this.GetNumber(
            res?.totalPages ?? res?.TotalPages,
            calculatedTotalPages
          )
        );

        const returnedPage = this.GetPositiveNumber(
          res?.pageNumber ?? res?.PageNumber ?? res?.currentPage ?? res?.CurrentPage,
          this.RequestPage
        );

        this.RequestPage = Math.min(returnedPage, this.RequestTotalPages);

        // If the current page disappeared after an approval/payment/delete,
        // automatically request the last valid page.
        if (returnedPage > this.RequestTotalPages) {
          this.RequestPage = this.RequestTotalPages;
          this.RequestLoading = false;
          this.GetBookedRequest();
          return;
        }

        this.RequestLoading = false;
        this.cdr.detectChanges();
      },

      error: (err: any) => {
        console.log('GetBookedRequest error:', err);
        this.RequestLoading = false;
        this.cdr.detectChanges();

        this.messageModal.show(
          err?.error?.message ||
          err?.message ||
          'Error fetching booking requests'
        );
      }
    });
  }

  ChangeRequestPage(page: number): void {
    const targetPage = Number(page);

    if (!Number.isInteger(targetPage)) return;
    if (targetPage < 1) return;
    if (targetPage > this.RequestTotalPages) return;
    if (targetPage === this.RequestPage) return;
    if (this.RequestLoading) return;

    this.RequestPage = targetPage;
    this.GetBookedRequest();
  }

  // =====================================================
  // APPROVED CUSTOMERS
  // =====================================================

  GetApprovedCustumer(): void {
    

    this.ApprovedLoading = true;

    this.barber.GetApprovedBookingRequest(this.ApprovedPage).subscribe({
      next: (res: any) => {
        console.log('Approved Response:', res);

        const data = this.ExtractData(res);

        this.ApprovedBookingRequestDto = data;

        this.ApprovedPageSize = this.GetPositiveNumber(
          res?.pageSize ?? res?.PageSize,
          this.ApprovedPageSize
        );

        this.ApprovedTotalRecords = Math.max(
          0,
          this.GetNumber(
            res?.totalRecords ?? res?.TotalRecords ?? res?.totalCount ?? res?.TotalCount,
            data.length
          )
        );

        const calculatedTotalPages = Math.max(
          1,
          Math.ceil(this.ApprovedTotalRecords / this.ApprovedPageSize)
        );

        this.ApprovedTotalPages = Math.max(
          1,
          this.GetNumber(
            res?.totalPages ?? res?.TotalPages,
            calculatedTotalPages
          )
        );

        const returnedPage = this.GetPositiveNumber(
          res?.pageNumber ?? res?.PageNumber ?? res?.currentPage ?? res?.CurrentPage,
          this.ApprovedPage
        );

        this.ApprovedPage = Math.min(returnedPage, this.ApprovedTotalPages);

        if (returnedPage > this.ApprovedTotalPages) {
          this.ApprovedPage = this.ApprovedTotalPages;
          this.ApprovedLoading = false;
          this.GetApprovedCustumer();
          return;
        }

        this.ApprovedLoading = false;
        this.cdr.detectChanges();
      },

      error: (err: any) => {
        console.log('GetApprovedCustumer error:', err);
        this.ApprovedLoading = false;
        this.cdr.detectChanges();

        this.messageModal.show(
          err?.error?.message ||
          err?.message ||
          'Error fetching approved customers'
        );
      }
    });
  }

  ChangeApprovedPage(page: number): void {
    const targetPage = Number(page);

    if (!Number.isInteger(targetPage)) return;
    if (targetPage < 1) return;
    if (targetPage > this.ApprovedTotalPages) return;
    if (targetPage === this.ApprovedPage) return;
    if (this.ApprovedLoading) return;

    this.ApprovedPage = targetPage;
    this.GetApprovedCustumer();
  }

  // =====================================================
  // APPROVE BOOKING
  // =====================================================

  Approved(id: number): void {
    this.BookedId = id;
    this.Time = '';
    this.ApprovedButton = true;
  }

  ApprovedCustumer(): void {
    if (!this.Time) {
      this.messageModal.show('Please select appointment time');
      return;
    }

    if (!this.BookedId) {
      this.messageModal.show('Invalid booking selected');
      return;
    }

    

    this.Isloading = true;

    this.barber.ApprovedBooking(this.BookedId, this.Time).subscribe({
      next: (res: any) => {
        console.log('Approved:', res);

        this.ApprovedButton = false;
        this.Time = '';
        this.BookedId = 0;
        this.Isloading = false;

        // Refresh both lists while keeping their current pages.
        this.GetApprovedCustumer();
        this.GetBookedRequest();

        this.messageModal.show(res?.message || 'Customer is approved');
      },

      error: (err: any) => {
        console.log('Approved error:', err);
        this.Isloading = false;

        this.messageModal.show(
          err?.error?.message ||
          'Something is wrong'
        );
      }
    });
  }

  // =====================================================
  // CUSTOMER DID NOT COME
  // =====================================================

   DontComeCustomer(bookedId: number){
  if (this.DontComeCustomer1 || this.ApprovedLoading) return;

  this.DontComeCustomer1 = true;
  this.ApprovedLoading = true;

  this.barber.DontComeCustomer(bookedId).subscribe(
    (res: any) => {
      console.log(res)
      this.DontComeCustomer1 = false;
      this.messageModal.show(res?.message || 'Customer marked as did not come');
      this.Isloading = false;
        this.cdr.detectChanges();
      this.GetApprovedCustumer();
      
    },

    (err: any) => {
      this.DontComeCustomer1 = false;
      this.ApprovedLoading = false;
  this.cdr.detectChanges();
      console.log(err);

      this.messageModal.show(
        err?.error?.message ||
        'Could not update booking'
      );
    
  });
}

  // =====================================================
  // BILL
  // =====================================================

  GetBill(bookedId: number): void {
    if (this.Isloading) return;

    this.Isloading = true;

    this.barber.GetBill(bookedId).subscribe({
      next: (res: any) => {
        this.Bill = res;
        this.BillId = this.Bill?.billId ?? 0;

        console.log('Bill:', res);

        this.BillModal = true;
        this.Isloading = false;
        this.cdr.detectChanges();
      },

      error: (err: any) => {
        this.Isloading = false;
        console.log(err);

        this.messageModal.show(
          err?.error?.message ||
          'Could not load bill'
        );
      }
    });
  }

  CloseBill(): void {
    this.BillModal = false;
    this.Bill = null;
    this.BillId = 0;
    this.cdr.detectChanges();
  }

  ConfirmPayment(): void {
    if (!this.BillId || this.Isloading) return;

    this.Isloading = true;

    this.barber.ConfirmPayment(this.BillId).subscribe({
      next: (res: any) => {
        this.CloseBill();
        this.Isloading = false;

        // Refresh approved list because this customer is no longer pending.
        this.GetApprovedCustumer();

        this.messageModal.show(res?.message || 'Payment confirmed');
      },

      error: (err: any) => {
        this.Isloading = false;
        console.log(err);

        this.messageModal.show(
          err?.error?.message ||
          'Could not confirm payment'
        );
      }
    });
  }

  // =====================================================
  // TAB CHANGE
  // =====================================================

  ChangeBookingPage(pageTab: string): void {
    this.BookingPage = pageTab;

    if (pageTab === 'BookingRequest') {
      this.GetBookedRequest();
    }
    else if (pageTab === 'ApprovedCustumer') {
      this.GetApprovedCustumer();
    }
  }

  // =====================================================
  // RESPONSE HELPERS
  // =====================================================

  private ExtractData(res: any): any[] {
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.items)) return res.items;
    if (Array.isArray(res?.result)) return res.result;
    if (Array.isArray(res?.records)) return res.records;
    if (Array.isArray(res)) return res;

    return [];
  }

  private GetNumber(value: any, fallback: number): number {
    const numberValue = Number(value);
    return Number.isFinite(numberValue) ? numberValue : fallback;
  }

  private GetPositiveNumber(value: any, fallback: number): number {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue) || numberValue <= 0) {
      return fallback;
    }

    return numberValue;
  }
}
