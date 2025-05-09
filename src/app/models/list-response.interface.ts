/**
 * File: list-response.interface.ts
 * Description: Interface defining the structure for S3 list objects response
 * Author: Hidenori Takaku
 * Date: 2024
 */

import { S3File } from './s3-file.interface';

export interface ListResponse {
  Contents: S3File[];
} 