import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { BarberService } from '../../../../Service/Barber/barber-service';
import { MessageModalService } from '../../../../shared/message-modal.service';


@Component({
  selector: 'app-manual-entry',
  imports: [FormsModule,CommonModule],
  templateUrl: './manual-entry.html',
  styleUrl: './manual-entry.css',
})
export class ManualEntry implements OnInit{

ServiceDto:any[]=[]
SelectedItem:number[] = []
CustumerName:string = ''
Isloading : boolean = false

constructor(private barber:BarberService, private cdr:ChangeDetectorRef,private messageModal:MessageModalService){}

ngOnInit(): void {
  this.GetService()
}

GetService()
{
this.Isloading = true
 this.barber.ManualEntryService().subscribe(
  (res:any) => 
  {
     this.ServiceDto = res
     console.log(res)
     this.cdr.detectChanges()
     this.Isloading = false
  },
  (err:any)=>
  {
      console.log(err)
      this.Isloading = false

  }
 )
}

OnServiceChange(event:Event,ServiceId:number)
{
  var checkbox = event.target as HTMLInputElement
  if(checkbox.checked)
  {
    this.SelectedItem.push(ServiceId)
  }
  else{
    this.SelectedItem = this.SelectedItem.filter(id => id !==ServiceId)
  }
}

ManualEntryFunction()
{
  if (this.Isloading) return;
  this.Isloading = true
  this.barber.ManualEntry(this.CustumerName,this.SelectedItem).subscribe(
    (res:any)=>
    {
        console.log(res)
        this.Isloading = false
        this.GetService()
        this.messageModal.show(res?.message)
    },
    (err:any)=>
    {
        console.log(err)
        this.Isloading = false
        this.messageModal.show(err?.error?.message);
    }
  )
}

}
