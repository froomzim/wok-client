import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntranceComponent } from './entrance/entrance.component';



@NgModule({
  declarations: [
    EntranceComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntranceComponent
  ]
})
export class EntranceModule { }
