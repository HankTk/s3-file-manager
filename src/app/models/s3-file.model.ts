export interface S3File 
{
  Key: string;
  LastModified: Date;
  ETag: string;
  Size: number;
  StorageClass: string;
  url?: string;
}

export interface UploadProgress 
{
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
} 