export interface UploadProgress {
  status: 'uploading' | 'error' | 'completed';
  progress?: number;
  error?: string;
  fileName: string;
} 