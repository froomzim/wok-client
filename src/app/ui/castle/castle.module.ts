import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CastleComponent } from './castle/castle.component';



@NgModule({
  declarations: [
    CastleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CastleComponent
  ]
})
export class CastleModule { }
