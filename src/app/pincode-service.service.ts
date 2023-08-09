import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PincodeService {
  private apiBaseUrl = 'https://api.postalpincode.in';

  constructor(private http: HttpClient) {}

  getPincodeDetails(pincode: string): Observable<any> {
    const url = `${this.apiBaseUrl}/pincode/${pincode}`;
    return this.http.get(url);
  }
}