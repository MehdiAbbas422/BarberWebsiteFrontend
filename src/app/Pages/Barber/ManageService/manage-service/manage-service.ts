import { Component, OnInit } from '@angular/core';
import { BarberService } from '../../../../Service/Barber/barber-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MessageModalService } from '../../../../shared/message-modal.service';

@Component({
  selector: 'app-manage-service',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-service.html',
  styleUrl: './manage-service.css',
})
export class ManageService implements OnInit{

ServiceList:any[] =[];
BarberServiceList:any[]=[];
Isloading:boolean = false
Keyword:string = ''
Page:number = 1
PageSize = 10;
TotalPages = 1;
TotalRecords = 0;
get PageNumbers(): number[] { return Array.from({ length: this.TotalPages }, (_, index) => index + 1); }
get RecordEnd(): number { return Math.min(this.Page * this.PageSize, this.TotalRecords); }
constructor(private barber:BarberService,private cdr:ChangeDetectorRef,private messageModal:MessageModalService){}


ngOnInit(): void {
  this.Isloading = true ;
  this.GetServiceList()
  this.GetBarberService()
  this.Isloading = false
}

GetServiceList(){
    this.Isloading = true ;
    this.barber.GetService(this.Keyword,this.Page).subscribe(
      (res:any) =>
      {
        
          console.log(res)
          this.ServiceList = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          this.Page = res?.pageNumber ?? this.Page;
          this.PageSize = res?.pageSize ?? this.PageSize;
          this.TotalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.ServiceList.length) / this.PageSize));
          this.TotalRecords = res?.totalRecords ?? this.ServiceList.length;
          this.cdr.detectChanges()
          this.Isloading =false;
      },
      (err:any) =>
      {
          console.log(err)
          this.messageModal.showHttpError(err, err?.error?.message)
          this.Isloading =false
      }
      
    )
}

ChangePage(page: number): void {
  if (page < 1 || page > this.TotalPages || page === this.Page || this.Isloading) return;
  this.Page = page;
  this.GetServiceList();
}

AddService(ServiceId:number)
{
  this.Isloading =true;
  this.barber.AddService(ServiceId).subscribe(
    (res:any) =>
    {
      console.log(res)
       this.GetBarberService();
      this.Isloading =false;
        this.messageModal.show(res?.message);
    },
    (err:any) =>
    {
      console.log(err)
       this.GetServiceList()
      this.Isloading =false;
      this.messageModal.showHttpError(err, err?.error?.message);
    }
  )
}

GetBarberService()
{
  this.Isloading = true ;
  this.barber.GetBarberService().subscribe(
    (res:any)=>
    {
        console.log(res)
        this.BarberServiceList = res
        this.cdr.detectChanges();
        this.Isloading =false;
    },
    (err:any)=>{
      console.log(err)
      this.Isloading = false;
      this.messageModal.showHttpError(err, err?.error?.message);
    }
  )

}

DeleteService(Id:number)
{
  this.Isloading=true;
  this.barber.DeleteBarberService(Id).subscribe(
    (res:any) =>
    {
        this.GetBarberService()
        this.Isloading=false;
        this.messageModal.show(res?.message);
    },
    (err:any)=>
    {
        console.log(err);
        this.Isloading=false;
      this.messageModal.showHttpError(err, err?.error?.message)
    }
  )
}

}
