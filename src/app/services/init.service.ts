import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  constructor(private http: HttpClient) {}

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/env').subscribe({
        next: (config: any) => {
          // Update environment variables
          environment.aws.region = config.AWS_REGION;
          environment.aws.bucketName = config.AWS_BUCKET_NAME;
          environment.aws.endpoint = config.AWS_ENDPOINT;
          environment.aws.accessKeyId = config.AWS_ACCESS_KEY_ID;
          environment.aws.secretAccessKey = config.AWS_SECRET_ACCESS_KEY;
          resolve();
        },
        error: (error) => {
          console.error('Failed to load environment configuration:', error);
          reject(error);
        }
      });
    });
  }
} 