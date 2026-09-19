import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BarberService {
      private apiUrl = 'https://localhost:7183/api/barber';
    
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
}
