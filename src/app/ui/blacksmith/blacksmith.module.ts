import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlacksmithComponent } from './blacksmith/blacksmith.component';



@NgModule({
  declarations: [
    BlacksmithComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BlacksmithComponent
  ]
})
export class BlacksmithModule { }
