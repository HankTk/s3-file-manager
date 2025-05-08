import { Component, OnInit, OnDestroy } from '@angular/core';
import { S3Service } from '../services/s3.service';
import { S3File, UploadProgress } from '../models/s3-file.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit, OnDestroy {

  files: S3File[] = [];
  uploading = false;
  error: string | null = null;
  uploadProgress: UploadProgress | null = null;
  private uploadProgressSubscription: Subscription;

  constructor(private s3Service: S3Service) {
    this.uploadProgressSubscription = this.s3Service.getUploadProgress().subscribe(
      progress => {
        this.uploadProgress = progress;
        this.uploading = progress?.status === 'uploading';
        if (progress?.status === 'error') {
          this.error = progress.error || 'Upload failed';
        }
      }
    );
  }

  ngOnInit() {
    this.loadFiles();
  }

  ngOnDestroy() {
    this.uploadProgressSubscription.unsubscribe();
  }

  async loadFiles() {
    try {
      this.files = await this.s3Service.listFiles();
    } catch (error) {
      this.error = 'Error loading files. Please try again.';
      console.error('Error loading files:', error);
    }
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.error = null;

      try {
        await this.s3Service.uploadFile(file);
        await this.loadFiles();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error uploading file. Please try again.';
        console.error('Error uploading file:', error);
      } finally {
        input.value = ''; // Reset the file input
      }
    }
  }

  async deleteFile(key: string) {
    if (confirm('Are you sure you want to delete this file?')) {
      try {
        await this.s3Service.deleteFile(key);
        await this.loadFiles();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Error deleting file. Please try again.';
        console.error('Error deleting file:', error);
      }
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

}
