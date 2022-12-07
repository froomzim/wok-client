import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { IProviderOptions } from '@mindsorg/web3modal-angular/lib/web3modal-ts/src';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Web3ModalModule, Web3ModalService } from '@mindsorg/web3modal-angular';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const walletsProviders: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: undefined,
      rpc: {
        1: "https://RPC_URL",
        56: "https://bsc-dataseed.binance.org",
        1997: "https://rpc.factorychain.io",
        137: "https://polygon-rpc.com/"
      },
      chainId: 1
    },
  }
};
@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    Web3ModalModule,
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MainComponent,
  ],
  providers: [
    {
      provide: Web3ModalService,
      useFactory: () => {
        return new Web3ModalService({
          network: "mainnet",
          cacheProvider: false,
          providerOptions: walletsProviders,
          disableInjectedProvider: false
        })
      }
    }
  ],
})

export class MainModule { }
