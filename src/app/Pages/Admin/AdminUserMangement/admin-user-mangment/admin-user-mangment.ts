import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../Service/Admin/admin-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MessageModalService } from '../../../../shared/message-modal.service';


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
    {role:'User',},
    {role:'MainAdmin'}
  
  ]
  Keyword:string = '';
  page:number = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;
  get PageNumbers(): number[] { return Array.from({ length: this.totalPages }, (_, index) => index + 1); }
  get RecordEnd(): number { return Math.min(this.page * this.pageSize, this.totalRecords); }
  RoleDto:any = {
    Role:'',
    BarberId:0,
  };
  Isloading:boolean = false;


constructor(private adminService: AdminService,private cdr:ChangeDetectorRef,private messageModal:MessageModalService) {}

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
      if (res == null) {
        this.Isloading = false;
        this.cdr.detectChanges();
        this.messageModal.show(null);
        return;
      }
      this.UserList = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
      this.page = res?.pageNumber ?? this.page;
      this.pageSize = res?.pageSize ?? this.pageSize;
      this.totalPages = res?.totalPages ?? Math.max(1, Math.ceil((res?.totalRecords ?? this.UserList.length) / this.pageSize));
      this.totalRecords = res?.totalRecords ?? this.UserList.length;
      
      this.Isloading = false;
this.cdr.detectChanges()
    },
  
    (error) => {
      console.error('Error fetching user list:', error);
      this.messageModal.show(error?.error?.message || 'An error occurred while fetching the user list.');
     this.Isloading = false
     this.cdr.detectChanges()
    }
  );
  }

  ChangePage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.page || this.Isloading) return;
    this.page = page;
    this.GetUserList(this.Keyword, this.page);
  }

  UpdateRole(Role:string)
  {
    this.Isloading = true;
    let UserId = this.UserId

    this.adminService.UpdateRole(UserId,Role).subscribe(
      (res:any)=>
      {
      
          this.RoleChange =false;
        let Keyword = this.Keyword
        let page = this.page
       this.GetUserList(Keyword,page);
     this.Isloading = false 
     this.cdr.detectChanges()
      this.messageModal.show('User Role Updated Successfully')
      },
      (err:any)=>
      {
        this.messageModal.show(err?.error?.message)
        console.log(err)
        this.Isloading=false
      }
    )



  }
  Search()
  {
    this.Isloading = true
    this.page = 1
    this.GetUserList(this.Keyword,this.page)
    this.Isloading = false
  }

}



