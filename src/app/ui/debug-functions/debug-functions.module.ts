import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebugFunctionsComponent } from './debug-functions/debug-functions.component';



@NgModule({
  declarations: [
    DebugFunctionsComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DebugFunctionsComponent
  ]
})
export class DebugFunctionsModule { }
