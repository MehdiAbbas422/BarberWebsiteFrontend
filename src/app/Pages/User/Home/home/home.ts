import { Component, OnInit } from '@angular/core';
import { Authentication } from '../../../../Service/Auth/authentication';
import { Router } from '@angular/router';
import { UserService } from '../../../../Service/User/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  BookingPage:string = 'Booking';
  Isloading:boolean =false;
  Service:number[]=[]
  BarberDto:any[] = [];
  BookingRequestDto:any[] = [];
  Bill:any = null;
  SelectedBooking:any = null;
  ShowBillModal:boolean = false;
  ShowReportModal:boolean = false;
  ReportDetail:string = '';
  Keyword:string =''
  Page:number = 1
  Page1:number = 1
  BarberPageSize = 10;
  BarberTotalPages = 1;
  BarberTotalRecords = 0;
  BookingPageSize = 10;
  BookingTotalPages = 1;
  BookingTotalRecords = 0;
  get BarberPageNumbers(): number[] { return Array.from({ length: this.BarberTotalPages }, (_, index) => index + 1); }
  get BookingPageNumbers(): number[] { return Array.from({ length: this.BookingTotalPages }, (_, index) => index + 1); }
  get BarberRecordEnd(): number { return Math.min(this.Page * this.BarberPageSize, this.BarberTotalRecords); }
  get BookingRecordEnd(): number { return Math.min(this.Page1 * this.BookingPageSize, this.BookingTotalRecords); }
  SelectedBookingTime = '';
  ShowTimeModal = false
  ServiceList:any[] = []
  

constructor(private auth:Authentication , private routes:Router,
  private user:UserService , private cdr:ChangeDetectorRef){}


ngOnInit(): void {
  this.GetBarber(this.Keyword,this.Page)
  this.GetBookedRequest()
  this.GetService()

}

OnServiceChange(event:Event,ServiceId:number)
{
  var CheckBox = event.target as HTMLInputElement;
  if(CheckBox.checked)
  {
    this.Service.push(ServiceId)
  }
  else{
    this.Service = this.Service.filter(id => id !== ServiceId)
  }
}

BookingRequest(BarberId:number)
{
  this.Isloading =true
  this.user.BookingRequest(BarberId,0,this.Service).subscribe(
    (res:any)=>
    {
      console.log(this.Service)
        console.log(res)
        this.GetBarber(this.Keyword,this.Page);
        this.GetBookedRequest();
        this.Isloading = false;
        alert(res.message)
    },
    (err:any)=>
    {
      console.log(this.Service)
        console.log(err)
        this.Isloading = false;
        alert(err.error.message)
    }
  )
}

logout()
{
  this.auth.Logout()
  this.routes.navigate(['/sigin']);
}

GetBarber(Keyword:string,Page:number)
{ this.Isloading =true
   this.user.GetBarber(Keyword,Page).subscribe(
    (res:any) =>
    {
        console.log(res)
        this.BarberDto = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        this.Page = res?.pageNumber ?? this.Page;
        this.BarberPageSize = res?.pageSize ?? this.BarberPageSize;
        this.BarberTotalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.BarberDto.length) / this.BarberPageSize));
        this.BarberTotalRecords = res?.totalRecords ?? this.BarberDto.length;
        
        this.Isloading = false
        this.cdr.detectChanges() 
      
    },
    (err:any)=>
    {
      console.log(err)
      this.Isloading= false
      this.cdr.detectChanges()
      alert(err.error.message)
    }
   )
}

GetBookedRequest()
{
  this.Isloading = true
  this.user.GetBookingRequest(this.Page1).subscribe(
    (res:any)=>
    {
      this.BookingRequestDto = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      this.Page1 = res?.pageNumber ?? this.Page1;
      this.BookingPageSize = res?.pageSize ?? this.BookingPageSize;
      this.BookingTotalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.BookingRequestDto.length) / this.BookingPageSize));
      this.BookingTotalRecords = res?.totalRecords ?? this.BookingRequestDto.length;
      console.log(res)
      this.Isloading =false
      this.cdr.detectChanges()
    },
    (err:any)=>
    {
      console.log(err)
      this.Isloading = false
      this.cdr.detectChanges()
      alert(err.error.message)

    }
  )
}

GetBill(BookedId:number)
{
  this.Isloading = true
  if(BookedId === null || BookedId === undefined)
  {
      alert(" Please select a valid booking to view the bill.");
      this.Isloading = false;
      return;
  }
  this.user.GetBill(BookedId).subscribe(
    (res:any) =>
    {
      console.log(res)
      this.Bill = res;
      this.ShowBillModal = true;
      this.Isloading = false
      this.cdr.detectChanges()
    },
    (err:any) => 
      {
        this.Isloading = false
        console.log(err)
        alert(err.error.message || 'Bill load nahi ho saka')
      }  
  )
}
CloseBill()
{
  this.Isloading=true
  this.Bill = ''
  this.ShowBillModal = false;
  this.Isloading = false
}

RemoveBooking(BookedId:number)
{
  this.Isloading = true
  this.user.RemoveBooking(BookedId).subscribe(
    (res:any) =>
    {
      this.GetBookedRequest()
      this.Isloading = false
      alert(res.message)
    } ,
    (err:any) =>
      {
        this.Isloading = false
        console.log(err)
          alert(err.error.message || 'Booking remove nahi ho saki')
      } 
  )
}

OpenReport(booking:any)
{
  this.SelectedBooking = booking;
  this.ReportDetail = '';
  this.ShowReportModal = true;
}

SendReport()
{
  if (!this.SelectedBooking || !this.ReportDetail.trim()) return;
  if (this.Isloading) return;
  this.Isloading = true;

  this.user.Report(this.SelectedBooking.id, this.ReportDetail).subscribe(
    () =>
    {
      this.CloseReport();
      this.Isloading = false
      alert('Report sent');
    },
    (err:any) => 
      {
        console.log(err)
        this.Isloading =false
          alert(err.error.message || 'Report send nahi ho saki')
      } 
  )
}

CloseReport()
{
  this.ShowReportModal = false;
  this.SelectedBooking = null;
  this.ReportDetail = '';
}

ChangeBookingPage(Name:string)
{
  this.Isloading = true
  this.BookingPage = Name
  this.Isloading =false
}

OpenTimeModal(time: string) {
  this.SelectedBookingTime = time;
  this.ShowTimeModal = true;
}

CloseTimeModal() {
  this.ShowTimeModal = false;
  this.SelectedBookingTime = '';
}


GetService()
{
  this.Isloading = true
  this.user.GetService().subscribe(
    (res:any) =>
    {
      console.log(res)
      this.ServiceList = res;
      this.cdr.detectChanges()
      this.Isloading = false
    },
    (err:any) =>
    {
      console.log(err)
      this.Isloading = false
      alert(err.error.message || 'Service load nahi ho saka')
    }
  )
}

Search(){
  this.Page = 1;
  this.GetBarber(this.Keyword,this.Page);
}

ChangeBarberPage(page: number): void {
  if (page < 1 || page > this.BarberTotalPages || page === this.Page || this.Isloading) return;
  this.Page = page;
  this.GetBarber(this.Keyword, this.Page);
}

ChangeBookingPageNumber(page: number): void {
  if (page < 1 || page > this.BookingTotalPages || page === this.Page1 || this.Isloading) return;
  this.Page1 = page;
  this.GetBookedRequest();
}
}
