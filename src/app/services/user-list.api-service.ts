import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserData } from '../models/user-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListApiService {
  constructor(private readonly httpClient: HttpClient) { }

  public getUsers$(): Observable<UserData[]> {
    return this.httpClient.get<UserData[]>('http://localhost:5256/api/users');
  }

  public getUserIcon$(iconName: string): Observable<Blob> {
    return this.httpClient.get(`http://localhost:5256/api/icons?name=${iconName}`, { responseType: 'blob' });
  }
}
