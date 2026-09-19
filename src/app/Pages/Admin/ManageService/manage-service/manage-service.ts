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
          this.ServiceList = res
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



