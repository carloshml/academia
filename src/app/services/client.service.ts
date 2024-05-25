import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiURL = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  constructor(private httpClient: HttpClient) { }

  async get() {
    return await lastValueFrom(this.httpClient.get(this.apiURL));
  }
}
