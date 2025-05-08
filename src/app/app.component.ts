import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FileManagerComponent
  ]
})
export class AppComponent {
  title = 'S3 File Manager';
}
