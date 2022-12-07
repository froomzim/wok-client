import { LocalStorageService } from './../services/localStorage/localStorage.service';
import { Web3ModalModule } from '@mindsorg/web3modal-angular';
import { Web3ModalProvider } from './providers/web3Modal.provider';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './services/login.service';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    Web3ModalModule,
  ],
  providers: [
    Web3ModalProvider,
    LoginService,
    LocalStorageService,
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
