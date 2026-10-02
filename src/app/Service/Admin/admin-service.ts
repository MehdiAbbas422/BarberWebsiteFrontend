import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
    private apiUrl = '/Admin';
  
    constructor(private http: HttpClient) {}

    GetUser(Keyword:string,page:number)
    {
      return this.http.get(`${this.apiUrl}/GetUser?Keyword=${Keyword}&page=${page}`);
    }
    UpdateRole(UserId:number,RoleName:string)
    {
      return this.http.put(`${this.apiUrl}/Update-Role`,{ UserId, RoleName });
    }
    GetService(Keyword:string,Page:number)
    {
        return this.http.get(`${this.apiUrl}/Get-Service?Keyword=${Keyword}&Page=${Page}`)
    }
    SetService(Service:any)
    {
      return this.http.post(`${this.apiUrl}/Set-Service`,Service);
    }
    UpdateService(Service:any)
    {
      return this.http.put(`${this.apiUrl}/Update-Service`,Service);
    }
    DeleteService(Id:number)
    {
      return this.http.delete(`${this.apiUrl}/Delete-Service/${Id}`,{});
    }

    ////////////

    GetBarber(Keyword:string,page:number)
    {
      return this.http.get(`${this.apiUrl}/GetBarber?Keyword=${Keyword}&page=${page}`);
    }

    KickOut(BarberId:number)
    {
      return this.http.post(`${this.apiUrl}/KickOut`,{BarberId});
    }
    
    ///

    GetReport(keyword: string = '', page: number = 1)
{
  return this.http.get(`${this.apiUrl}/GetReport?keyword=${keyword}&page=${page}`)
}

DeleteReport(reportId: number)
{
  return this.http.delete(`${this.apiUrl}/DeleteReport/${reportId}`)
}

getEarning() {
    return this.http.get(`${this.apiUrl}/GetEarning`);
  }

  // 2. Get Earning Entry By Id
  getEarningEntry(earningId: number) {
    return this.http.get(`${this.apiUrl}/GetEarningEntry/${earningId}`);
  }


}
