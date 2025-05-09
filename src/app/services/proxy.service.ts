import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InitService } from './init.service';
import { UploadResponse } from '../models/upload-response.interface';
import { ListResponse } from '../models/list-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ProxyService 
{
  private apiUrl = '/api';

  private http = inject(HttpClient);
  private initService = inject(InitService);

  uploadFile (file: File): Observable<UploadResponse> 
  {
    const awsConfig = this.initService.getAwsConfig();
    return this.http.put<UploadResponse>(
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

  listFiles (): Observable<ListResponse> 
  {
    const awsConfig = this.initService.getAwsConfig();
    return this.http.get<ListResponse>(`${this.apiUrl}/${awsConfig().bucketName}?list-type=2`);
  }

  deleteFile (key: string): Observable<void> 
  {
    const awsConfig = this.initService.getAwsConfig();
    return this.http.delete<void>(`${this.apiUrl}/${awsConfig().bucketName}/${encodeURIComponent(key)}`);
  }
} 
