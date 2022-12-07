import { IProviderOptions } from "@mindsorg/web3modal-angular/lib/web3modal-ts/src";
import WalletConnectProvider from '@walletconnect/web3-provider';

export const WalletsProviders: IProviderOptions = {
    walletconnect: {
        package: WalletConnectProvider,
    }
};
