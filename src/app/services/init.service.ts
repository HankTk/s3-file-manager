import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AwsConfig 
{
  region: string;
  bucketName: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
}

@Injectable({
  providedIn: 'root'
})
export class InitService 
{
  private http = inject(HttpClient);

  private awsConfig = signal<AwsConfig>({
    region: '',
    bucketName: '',
    endpoint: '',
    accessKeyId: '',
    secretAccessKey: ''
  });

  getAwsConfig() 
  {
    return this.awsConfig.asReadonly();
  }

  private updateAwsConfig(config: any): void 
  {
    this.awsConfig.set({
      region: config.AWS_REGION,
      bucketName: config.AWS_BUCKET_NAME,
      endpoint: config.AWS_ENDPOINT,
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    });
  }

  private handleConfigError(error: any, reject: (reason?: any) => void): void 
  {
    console.error('Failed to load environment configuration:', error);
    reject(error);
  }

  init(): Promise<void> 
  {
    return new Promise((resolve, reject) => 
    {
      this.http.get('http://localhost:3000/api/env').subscribe({
        next: (config: any) => 
        {
          this.updateAwsConfig(config);
          resolve();
        },
        error: (error) => this.handleConfigError(error, reject)
      });
    });
  }
} 