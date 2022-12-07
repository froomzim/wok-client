import { DebugFunctionsModule } from './debug-functions/debug-functions.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiManagerComponent } from './ui-manager/ui-manager.component';
import { MatButtonModule } from '@angular/material/button';
import { ResourcesModule } from './resources/resources.module';
import { ProfileModule } from './profile/profile.module';
import { BlacksmithModule } from './blacksmith/blacksmith.module';
import { StorageModule } from './storage/storage.module';
import { TrainingModule } from './training/training.module';
import { CastleModule } from './castle/castle.module';
import { EntranceModule } from './entrance/entrance.module';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    UiManagerComponent
  ],
  imports: [
    ScrollingModule,
    BlacksmithModule,
    StorageModule,
    TrainingModule,
    CastleModule,
    EntranceModule,
    ProfileModule,
    ResourcesModule,
    CommonModule,
    MatButtonModule,
    DebugFunctionsModule,
  ],
  exports: [
    UiManagerComponent
  ]
})
export class UiModule { }
