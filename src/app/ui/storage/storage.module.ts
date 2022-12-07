import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageComponent } from './storage/storage.component';



@NgModule({
  declarations: [
    StorageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StorageComponent
  ]
})
export class StorageModule { }
