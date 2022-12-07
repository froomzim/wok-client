import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingComponent } from './training/training.component';



@NgModule({
  declarations: [
    TrainingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TrainingComponent
  ]
})
export class TrainingModule { }
