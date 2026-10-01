import { Component, OnInit, signal } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Signal } from '@angular/core';


@Component({
  selector: 'app-manage-service',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-service.html',
  styleUrl: './manage-service.css',
})
export class ManageService implements OnInit{

ServiceList:any[] =[];
PageSize = 10;
totalPages = 1;
totalRecords = 0;
get PageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1); }
get RecordEnd(): number { return Math.min(this.Page * this.PageSize, this.totalRecords); }
Isloading = signal<boolean>(false)
Keyword:string = ''
Page:number = 1
InputService:any={
  ServiceName: '',
  Price: 0
}

UpdateInputService:any={
  Id:0,
  ServiceName: '',
  Price: 0
}

constructor(private admin:AdminService,private cdr:ChangeDetectorRef){}


ngOnInit(): void {
  this.GetServiceList()
}


GetServiceList(){
    this.Isloading.set(true) ;
    this.admin.GetService(this.Keyword,this.Page).subscribe(
      (res:any) =>
      {
        
          console.log(res)
          this.ServiceList = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          this.Page = res?.pageNumber ?? this.Page;
          this.PageSize = res?.pageSize ?? this.PageSize;
          this.totalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.ServiceList.length) / this.PageSize));
          this.totalRecords = res?.totalRecords ?? this.ServiceList.length;
          this.cdr.detectChanges()
          this.Isloading.set(false)
          
      },
      (err:any) =>
      {
          console.log(err)
          alert(err.error.message)
          this.Isloading.set(false)
      }
      
    )
}

ChangePage(page: number): void {
  if (page < 1 || page > this.totalPages || page === this.Page || this.Isloading()) return;
  this.Page = page;
  this.GetServiceList();
}

Search(): void {
  this.Page = 1;
  this.GetServiceList();
}

CreateService()
{
  this.Isloading.set(true)
  this.admin.SetService(this.InputService).subscribe(
    (res:any)=>
    {
      this.ResetInput()
      this.GetServiceList()
      this.cdr.detectChanges()
      alert("Service Is Created")
      this.Isloading.set(false)
    },
    (err:any)=>
    {
      console.log(err);
      this.ResetInput()
      alert("Some thing is wrong");
      this.Isloading.set(false)
      
    }
  )
}

Update(service:any)
{
  this.Isloading.set(true)
  this.UpdateInputService={
    Id:service.id,
    ServiceName:service.serviceName,
    Price:service.price

  }
  this.Isloading.set(false)
}

UpdateService()
{
  this.Isloading.set(true)
  this.admin.UpdateService(this.UpdateInputService).subscribe(
    (res:any) =>
    {
      this.ResetInput()
      this.GetServiceList()
      alert(res.message);
      this.Isloading.set(false)
    },
    (err:any) =>
    {
        console.log(err)
        alert(err.error.message);
        this.Isloading.set(false)
    }

  )
}

DeleteService(Id:number)
{
  this.Isloading.set(true)
  this.admin.DeleteService(Id).subscribe(
    (res:any)=>
    {
     
      this.GetServiceList()
      alert("Service Deleted")
      this.Isloading.set(false)
    },
  (err:any) =>
  {
      console.log(err);
      this.Isloading.set(false)
      alert(err.error.message)
      
  }
  )
}

ResetInput()
{
  this.InputService={
  ServiceName: '',
  Price: 0
}
this.UpdateInputService={
  Id:0,
  ServiceName: '',
  Price: 0
}
}

}



