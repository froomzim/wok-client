import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoldComponent } from './gold/gold.component';
import { StoneComponent } from './stone/stone.component';
import { ResourcesComponent } from './resources/resources.component';
import { WoodComponent } from './wood/wood.component';
import { TmNgOdometerModule } from 'tm-ng-odometer';

@NgModule({
  declarations: [
    GoldComponent,
    StoneComponent,
    ResourcesComponent,
    WoodComponent,
  ],
  imports: [
    CommonModule,
    TmNgOdometerModule,
  ],
  exports: [
    ResourcesComponent
  ]
})
export class ResourcesModule { }
