import { TokenInterceptorProvider } from './services/api/token.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main/main.module';
import { GameComponent } from './game/game.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoginModule } from './login/login.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { UiModule } from './ui/ui.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MatIconModule,
    FontAwesomeModule,
    UiModule,
    BrowserModule,
    AppRoutingModule,
    MainModule,
    LoginModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatProgressBarModule,
  ],
  providers: [
    TokenInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
