import { Component, OnInit, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Web3ModalService } from '@mindsorg/web3modal-angular';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit {

  constructor(
    private readonly api: ApiService,
    private web3ModalService: Web3ModalService,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  submit(): any {
    from(this.web3ModalService.open())
      .pipe(
        tap(provider => this.loginService.provider = provider),
        switchMap(() => this.loginService.getMessage()),
        switchMap((message) => this.loginService.requestWalletToSignMessage(message)),
        switchMap((result: any) => this.loginService.login(this.loginService.provider.selectedAddress, result.result)),

        catchError(error => {
          console.error(error);
          alert('something went wrong');
          return new Observable();
        })

      )
      .subscribe(() => {
        let get = this.api.profile.getProfile();
        get.subscribe((data: any) => {
          console.log(data);
          if (data != null) {
            window.location.href = '/game';
          }
        }, (error: any) => {
          if (error.error.message === 'User profile not found') {
            window.location.href = '/first-access';
          }
        });
      });
  }
}
