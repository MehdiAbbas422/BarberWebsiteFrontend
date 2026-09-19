import { Component, OnInit } from '@angular/core';
import { BarberService } from '../../../../Service/Barber/barber-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
constructor(private barber:BarberService,private cdr:ChangeDetectorRef){}


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
          this.ServiceList = res
          this.cdr.detectChanges()
          this.Isloading =false;
      },
      (err:any) =>
      {
          console.log(err)
          alert(err.error.message)
          this.Isloading =false
      }
      
    )
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
        alert(res.message);
    },
    (err:any) =>
    {
      console.log(err)
       this.GetServiceList()
      this.Isloading =false;
      alert(err.error.message);
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
      alert(err.error.message);
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
        alert(res.message);
    },
    (err:any)=>
    {
        console.log(err);
        this.Isloading=false;
        alert(err.error.message)
    }
  )
}

}
