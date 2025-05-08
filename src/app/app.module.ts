import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FileManagerComponent } from './file-manager/file-manager.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppComponent,
    FileSizePipe,
    FileManagerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
