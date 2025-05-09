import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AwsConfig } from '../models/aws-config.interface';
import { EnvConfig } from '../models/env-config.interface';
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

  getAwsConfig () 
  {
    return this.awsConfig.asReadonly();
  }

  private updateAwsConfig (config: EnvConfig): void 
  {
    this.awsConfig.set({
      region: config.AWS_REGION,
      bucketName: config.AWS_BUCKET_NAME,
      endpoint: config.AWS_ENDPOINT,
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY
    });
  }

  private handleConfigError (error: Error, reject: (reason?: Error) => void): void 
  {
    console.error('Failed to load environment configuration:', error);
    reject(error);
  }

  init (): Promise<void> 
  {
    return new Promise((resolve, reject) => 
    {
      this.http.get<EnvConfig>('http://localhost:3000/api/env').subscribe({
        next: (config) => 
        {
          this.updateAwsConfig(config);
          resolve();
        },
        error: (error) => this.handleConfigError(error, reject)
      });
    });
  }
} 
