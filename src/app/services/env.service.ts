import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private envConfig: any = null;

  constructor(private http: HttpClient) {}

  loadEnvConfig(): Observable<any> {
    return this.http.get('/api/env');
  }

  getEnvConfig() {
    return this.envConfig;
  }

  setEnvConfig(config: any) {
    this.envConfig = config;
  }
} 