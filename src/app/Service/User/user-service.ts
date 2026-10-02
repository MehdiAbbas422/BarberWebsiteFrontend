import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
      private apiUrl = '/api/User';
  
    constructor(private http: HttpClient) {}

    GetBarber(Keyword:string,page:number)
    {
      return this.http.get(`${this.apiUrl}/Get-Barber?Keyword=${Keyword}&page=${page}`);
      
    }

    BookingRequest(BarberId:number,UserId:number,SelectedItemIds:number[])
    {
        return this.http.post(`${this.apiUrl}/BookingRequest`,{BarberId,UserId,SelectedItemIds})
    }

    GetBookingRequest(page:number)
    {
      return this.http.get(`${this.apiUrl}/GetBookingRequest?page=${page}`)
    }
    GetBill(BookedId:number)
    {
      return this.http.get(`${this.apiUrl}/GetBill/${BookedId}`)
    }
    RemoveBooking(BookingId:number)
    {
      return this.http.delete(`${this.apiUrl}/RemoveBooking/${BookingId}`)
    }
    Report(BarberId:number , ReportDetail:string)
    {
      return this.http.post(`${this.apiUrl}/ReportService`,{BarberId,ReportDetail})
    }
    GetService()
    {
      return this.http.get(`${this.apiUrl}/GetService`)
    }

}
