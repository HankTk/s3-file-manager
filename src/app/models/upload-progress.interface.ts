/**
 * File: upload-progress.interface.ts
 * Description: Interface defining the structure for file upload progress tracking
 * Author: Hidenori Takaku
 * Date: 2024
 */

export interface UploadProgress {
  status: 'uploading' | 'error' | 'completed';
  progress?: number;
  error?: string;
  fileName: string;
} 