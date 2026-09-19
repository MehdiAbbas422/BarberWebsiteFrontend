import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-admin-user-mangment',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-user-mangment.html',
  styleUrl: './admin-user-mangment.css',
})
export class AdminUserMangment implements OnInit{

  RoleChange:boolean =false;
  UserId:number=0
  UserList:any[]=[];
  RoleList:any =[{
    role:'Admin',
    },
    {role:'Barber'},
    {role:'User',}
  
  ]
  Keyword:string = '';
  page:number = 1;
  RoleDto:any = {
    Role:'',
    BarberId:0,
  };
  Isloading:boolean = false;


constructor(private adminService: AdminService,private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    this.GetUserList(this.Keyword, this.page);
    };
  
ChangeRoleButton(Id:number)
{

this.Isloading =true;
this.RoleChange =true;
this.UserId = Id
this.Isloading =false

}
CencelRoleButton()
{
  this.Isloading =true;
this.RoleChange =false;

this.Isloading =false
}
  GetUserList(Keyword:string,page:number)
  {
    this.Isloading = true;
    this.adminService.GetUser(Keyword,page).subscribe(
      (res:any) => {
        console.log('User list fetched successfully:', res);
      this.UserList = res;
      this.cdr.detectChanges()
      this.Isloading = false;
    },
  
    (error) => {
      console.error('Error fetching user list:', error);
      alert(error.error.message || 'An error occurred while fetching the user list.');
     this.Isloading = false
    }
  );
  }

  UpdateRole(Role:string)
  {
    this.Isloading = true;
    let UserId = this.UserId

    this.adminService.UpdateRole(UserId,Role).subscribe(
      (res:any)=>
      {
        this.Isloading=true;
          this.RoleChange =false;
        let Keyword = this.Keyword
        let page = this.page
       this.GetUserList(Keyword,page);
     
       alert("User Role Updated SuccessFully")
      },
      (err:any)=>
      {
        alert(err.error.message)
        console.log(err)
        this.Isloading=false
      }
    )



  }

}



