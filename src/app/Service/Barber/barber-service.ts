import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BarberService {
      private apiUrl = 'http://BarixSalon.somee.com/api/Barber';
    
      constructor(private http: HttpClient) {}

      AddService(ServiceId:number)
      {
        return this.http.post(`${this.apiUrl}/Add-Barber-Service`,{ ServiceId });
      }

      GetService(Keyword:string,Page:number)
      {
      return this.http.get(`${this.apiUrl}/Get-Service?Keyword=${Keyword}&Page=${Page}`)
      }

      GetBarberService()
      {
        return this.http.get(`${this.apiUrl}/Get-Barber-Service`)
      }

      DeleteBarberService(Id:number)
      {
        return this.http.delete(`${this.apiUrl}/Delete-Barber-Service/${Id}`)
      }

    GetBookingRequest(page:number)
    {
      return this.http.get(`${this.apiUrl}/GetBookingRequest?page=${page}`)
    }
    ApprovedBooking(BookedId:number,BookedTime:any)
    {
      return this.http.post(`${this.apiUrl}/ApprovedBooking`,{BookedId,BookedTime})
    }

    GetApprovedBookingRequest(page: number)
{
  return this.http.get(`${this.apiUrl}/GetApprovedBookingRequest?page=${page}`)
}

DontComeCustomer(bookedId: number)
{
  return this.http.post(`${this.apiUrl}/DontComeCustomer/${bookedId}`, {})
}

GetBill(bookedId: number)
{
  return this.http.get(`${this.apiUrl}/GetBill/${bookedId}`)
}

ConfirmPayment(billId: number)
{
  return this.http.post(`${this.apiUrl}/ConfirmPayment/${billId}`, {})
}

ManualEntry(CustumerName:string,SelectedItemList:number[])
{
   return this.http.post(`${this.apiUrl}/ManualEntry`,{CustumerName,SelectedItemList})
}
ManualEntryService()
{
  return this.http.get(`${this.apiUrl}/GetManualServices`)
}


}
