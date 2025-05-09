import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { S3Service } from '../services/s3.service';
import { Subscription } from 'rxjs';
import { FileSizePipe } from '../pipes/file-size.pipe';
import { S3File } from '../models/s3-file.interface';
import { UploadProgress } from '../models/upload-progress.interface';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FileSizePipe
  ]
})
export class FileManagerComponent implements OnInit, OnDestroy
{

  files: S3File[] = [];
  uploading = false;
  error: string | null = null;
  uploadProgress: UploadProgress | null = null;

  private uploadProgressSubscription: Subscription = new Subscription();

  private s3Service = inject(S3Service);

  private handleUploadProgress (progress: UploadProgress | null) 
  {
    this.uploadProgress = progress;
    this.uploading = progress?.status === 'uploading';
    if (progress?.status === 'error') 
    {
      this.error = progress.error || 'Upload failed';
    }
  }

  ngOnInit () 
  {
    this.uploadProgressSubscription = this.s3Service.getUploadProgress().subscribe(
      this.handleUploadProgress.bind(this)
    );
    this.loadFiles();
  }

  ngOnDestroy () 
  {
    this.uploadProgressSubscription.unsubscribe();
  }

  async loadFiles () 
  {
    try 
    {
      this.files = await this.s3Service.listFiles();
    } 
    catch (error) 
    {
      this.error = 'Error loading files. Please try again.';
      console.error('Error loading files:', error);
    }
  }

  async onFileSelected (event: Event) 
  {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) 
    {
      const file = input.files[0];
      this.error = null;

      try 
      {
        await this.s3Service.uploadFile(file);
        await this.loadFiles();
      } 
      catch (error) 
      {
        this.error = error instanceof Error ? error.message : 'Error uploading file. Please try again.';
        console.error('Error uploading file:', error);
      } 
      finally 
      {
        input.value = ''; // Reset the file input
      }
    }
  }

  async deleteFile (key: string) 
  {
    if (confirm('Are you sure you want to delete this file?')) 
    {
      try 
      {
        await this.s3Service.deleteFile(key);
        await this.loadFiles();
      } 
      catch (error) 
      {
        this.error = error instanceof Error ? error.message : 'Error deleting file. Please try again.';
        console.error('Error deleting file:', error);
      }
    }
  }

}
