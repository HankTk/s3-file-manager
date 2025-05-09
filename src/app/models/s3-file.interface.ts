/**
 * File: s3-file.interface.ts
 * Description: Interface defining the structure for S3 file metadata
 * Author: Hidenori Takaku
 * Date: 2024
 */

export interface S3File {
  Key: string;
  LastModified: Date;
  ETag: string;
  Size: number;
  StorageClass: string;
  url?: string;
}
