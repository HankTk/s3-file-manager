/**
 * File: aws-config.interface.ts
 * Description: Interface defining the structure for AWS configuration
 * Author: Hidenori Takaku
 * Date: 2024
 */

export interface AwsConfig {
  region: string;
  bucketName: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
} 