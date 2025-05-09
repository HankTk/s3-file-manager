/**
 * File: s3.service.ts
 * Description: Service for handling AWS S3 operations including file upload, download, and management
 * Author: Hidenori Takaku
 * Date: 2024
 */

import { Injectable, inject } from '@angular/core';
import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { BehaviorSubject, Observable } from 'rxjs';
import { InitService } from './init.service';
import { UploadProgress } from '../models/upload-progress.interface';
import { S3File } from '../models/s3-file.interface';

@Injectable({
  providedIn: 'root'
})
export class S3Service 
{
  private s3Client: S3Client | null = null;
  private uploadProgress = new BehaviorSubject<UploadProgress | null>(null);

  private initService = inject(InitService);

  constructor () 
  {
    this.initializeS3Client();
  }

  private async initializeS3Client (): Promise<void> 
  {
    try 
    {
      await this.initService.init();
      const awsConfig = this.initService.getAwsConfig();
      this.s3Client = new S3Client({
        region: awsConfig().region,
        endpoint: awsConfig().endpoint,
        credentials: {
          accessKeyId: awsConfig().accessKeyId || '',
          secretAccessKey: awsConfig().secretAccessKey || ''
        },
        forcePathStyle: true,
        maxAttempts: 3,
        requestHandler: {
          abortSignal: undefined,
          connectionTimeout: 5000,
          socketTimeout: 10000
        }
      });
    } 
    catch (error) 
    {
      console.error('Failed to initialize S3 client:', error);
      throw error;
    }
  }

  private async ensureS3Client () 
  {
    if (!this.s3Client) 
    {
      await this.initializeS3Client();
    }
    if (!this.s3Client) 
    {
      throw new Error('Failed to initialize S3 client');
    }
    return this.s3Client;
  }

  getUploadProgress (): Observable<UploadProgress | null> 
  {
    return this.uploadProgress.asObservable();
  }

  async uploadFile (file: File): Promise<string> 
  {
    try 
    {
      if (file.size > 5 * 1024 * 1024 * 1024) 
      {
        throw new Error('File size exceeds 5GB limit');
      }

      this.uploadProgress.next({
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      });

      const arrayBuffer = await file.arrayBuffer();
      const s3Client = await this.ensureS3Client();
      const awsConfig = this.initService.getAwsConfig();
      
      const command = new PutObjectCommand({
        Bucket: awsConfig().bucketName,
        Key: file.name,
        ContentType: file.type,
        ACL: 'public-read',
        Body: new Uint8Array(arrayBuffer)
      });

      await s3Client.send(command);
      
      this.uploadProgress.next({
        fileName: file.name,
        progress: 100,
        status: 'completed'
      });

      return `https://${awsConfig().bucketName}.s3.${awsConfig().region}.amazonaws.com/${file.name}`;
    } 
    catch (error) 
    {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      this.uploadProgress.next({
        fileName: file.name,
        progress: 0,
        status: 'error',
        error: errorMessage
      });
      throw error;
    }
  }

  async listFiles (): Promise<S3File[]> 
  {
    try 
    {
      const s3Client = await this.ensureS3Client();
      const awsConfig = this.initService.getAwsConfig();
      const command = new ListObjectsV2Command({
        Bucket: awsConfig().bucketName
      });

      const response = await s3Client.send(command);
      return (response.Contents || []).map(item => ({
        ...item,
        url: `https://${awsConfig().bucketName}.s3.${awsConfig().region}.amazonaws.com/${item.Key}`
      })) as S3File[];
    } 
    catch (error) 
    {
      console.error('Error listing files:', error);
      throw error;
    }
  }

  async deleteFile (key: string): Promise<void> 
  {
    try 
    {
      const s3Client = await this.ensureS3Client();
      const awsConfig = this.initService.getAwsConfig();
      const command = new DeleteObjectCommand({
        Bucket: awsConfig().bucketName,
        Key: key
      });

      await s3Client.send(command);
    } 
    catch (error) 
    {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

} 
