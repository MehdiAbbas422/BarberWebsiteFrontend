import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
pageSize = 10;
totalPages = 1;
totalRecords = 0;

get PageNumbers(): number[] {
  return Array.from({ length: this.totalPages }, (_, index) => index + 1);
}
get RecordEnd(): number { return Math.min(this.page * this.pageSize, this.totalRecords); }

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
          this.BarberDto = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
          this.page = res?.pageNumber ?? this.page;
          this.pageSize = res?.pageSize ?? this.pageSize;
          this.totalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.BarberDto.length) / this.pageSize));
          this.totalRecords = res?.totalRecords ?? this.BarberDto.length;
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

ChangePage(page: number): void {
  if (page < 1 || page > this.totalPages || page === this.page || this.Isloading) return;
  this.page = page;
  this.GetBarberlist();
}

Kickout(BarberId:number)
    {
        if (this.Isloading) return;
        this.Isloading = true;
        this.admin.KickOut(BarberId).subscribe(
          (res:any)=>
          {
              console.log(res)
              this.GetBarberlist()
              alert(res.message);
          },
          (err:any) =>
          {
            
            console.log(err);
            alert(err.error.message);
            this.Isloading = false;
          }
        )
    }

    Search()
    {
      this.Isloading = true
      this.page = 1
      this.GetBarberlist()
    } 
      

}
