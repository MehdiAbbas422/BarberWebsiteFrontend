import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
      private apiUrl = 'https://localhost:7183/api/User';
  
    constructor(private http: HttpClient) {}

    GetBarber(Keyword:string,page:number)
    {
      return this.http.get(`${this.apiUrl}/Get-Barber?Keyword=${Keyword}&page=${page}`);
      
    }

    BookingRequest(BarberId:number,UserId:number,SelectedItemIds:any)
    {
        return this.http.post(`${this.apiUrl}/BookingRequest`,{BarberId,UserId,SelectedItemIds})
    }

}
