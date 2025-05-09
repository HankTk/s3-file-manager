import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InitService } from './init.service';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  private apiUrl = '/api';

  private http = inject(HttpClient);
  private initService = inject(InitService);

  uploadFile(file: File): Observable<any> {
    const awsConfig = this.initService.getAwsConfig();
    return this.http.put(
      `${this.apiUrl}/${awsConfig().bucketName}/${file.name}`,
      file,
      {
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read'
        }
      }
    );
  }

  listFiles(): Observable<any> {
    const awsConfig = this.initService.getAwsConfig();
    return this.http.get(`${this.apiUrl}/${awsConfig().bucketName}?list-type=2`);
  }

  deleteFile(key: string): Observable<any> {
    const awsConfig = this.initService.getAwsConfig();
    return this.http.delete(`${this.apiUrl}/${awsConfig().bucketName}/${encodeURIComponent(key)}`);
  }

} 