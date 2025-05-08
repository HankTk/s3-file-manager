import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProxyService {

  private bucketName = environment.aws.bucketName;
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${this.bucketName}/${file.name}`,
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
    return this.http.get(`${this.apiUrl}/${this.bucketName}?list-type=2`);
  }

  deleteFile(key: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${this.bucketName}/${encodeURIComponent(key)}`);
  }

} 