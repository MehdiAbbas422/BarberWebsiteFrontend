import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { error } from 'node:console';

@Component({
  selector: 'app-admin-employmangment',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-employmangment.html',
  styleUrl: './admin-employmangment.css',
})
export class AdminEmploymangment implements OnInit{


BarberDto:any[]=[];
Isloading:boolean = false;
Keyword:string = '';
page:number =1;

constructor(private admin:AdminService,private cdr:ChangeDetectorRef){}


ngOnInit()
{
    this.GetBarberlist()
}

GetBarberlist()
{
    this.Isloading =true
    this.admin.GetBarber(this.Keyword,this.page).subscribe(
      (res:any)=>
      {
        console.log(res)
          this.BarberDto = res;
          this.cdr.detectChanges();
          this.Isloading=false;
      },
      (err:any) =>
      {
        console.log(err)
        alert(err.error.message);
        this.Isloading =false;
      }
    )

    

}

Kickout(BarberId:number)
    {
        this.admin.KickOut(BarberId).subscribe(
          (res:any)=>
          {
            this.Isloading =true
              console.log(res)
              this.GetBarberlist()
              alert(res.message);

              this.Isloading =false
          },
          (err:any) =>
          {
            
            console.log(err);
            alert(err.error.message);
            this.Isloading = false;
          }
        )
    }

}
