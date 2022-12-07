import { Web3ModalService } from '@mindsorg/web3modal-angular';
import { WalletsProviders } from './wallets.provider';


export const Web3ModalProvider = {
    provide: Web3ModalService,
    useFactory: () => {
        return new Web3ModalService({
            network: "mainnet",
            cacheProvider: false,
            providerOptions: WalletsProviders,
            disableInjectedProvider: false
        })
    }
}