/**
 * File: app.component.ts
 * Description: Main application component that serves as the root component
 * Author: Hidenori Takaku
 * Date: 2024
 */

import { Component } from '@angular/core';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FileManagerComponent
  ]
})
export class AppComponent 
{
  title = 'S3 File Manager';
}
