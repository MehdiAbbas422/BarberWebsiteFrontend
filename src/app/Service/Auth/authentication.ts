import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Authentication {

  private apiUrl = '/api/Auth';

  constructor(private http: HttpClient) {}

Signup(userData: any) {

return this.http.post(`${this.apiUrl}/signup`, userData);
}

VerfyEmail(OTP: string,Email:string) {
  const body = {
    OTP: OTP,
    Email: Email
  };
  return this.http.post(`${this.apiUrl}/verify`,body, {  });
}

Sigin(userData: any) {
  return this.http.post(`${this.apiUrl}/login`, userData);   
}

ResetPassword(email: string) {
  return this.http.post(`${this.apiUrl}/Reset-Password`, { email });
}

ChangePassword(Password: string) {
 return this.http.post(`${this.apiUrl}/Change-Password`, { Password })
}

ResendOtp(email: string) {
  return this.http.post(`${this.apiUrl}/Resend-OTP`, { email });
}

SaveToken(token: string) {
  localStorage.setItem('token', token);
}

Logout()
{
  localStorage.removeItem('token');
}

Role()
{
  const token = localStorage.getItem('token');
 if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];  } catch (e) {
    return null; // Crash hone se bacha liya
  }
}
}

ChangeUserName(Name:string)
{
  return this.http.post(`${this.apiUrl}/ChangeUserName?Name=${Name}`,{})
}

}
