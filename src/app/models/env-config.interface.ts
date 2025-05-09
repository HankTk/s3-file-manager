/**
 * File: env-config.interface.ts
 * Description: Interface defining the structure for environment configuration
 * Author: Hidenori Takaku
 * Date: 2024
 */

export interface EnvConfig {
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
  AWS_ENDPOINT: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
} 