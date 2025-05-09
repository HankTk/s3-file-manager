/**
 * File: file-size.pipe.ts
 * Description: Angular pipe for formatting file sizes in human-readable format
 * Author: Hidenori Takaku
 * Date: 2024
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform 
{
  transform (bytes: number | undefined): string 
  {
    if (!bytes || bytes === 0) 
    {
      return '0 Bytes';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
