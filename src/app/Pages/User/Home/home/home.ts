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
  Isloading:boolean =false;
  Service:any[]=[]
  BarberDto:any[] = [];
  Keyword:string =''
  Page:number = 1


constructor(private auth:Authentication , private routes:Router,
  private user:UserService , private cdr:ChangeDetectorRef){}


ngOnInit(): void {
  this.GetBarber(this.Keyword,this.Page)
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
        console.log(res)
        this.Isloading = false;
        alert(res.message)
    },
    (err:any)=>
    {
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
        this.BarberDto = res
        this.cdr.detectChanges()
        this.Isloading = false 
      
    },
    (err:any)=>
    {
      console.log(err)
      this.Isloading= false
      alert(err.error.message)
    }
   )
}

}
