import { TransactionHttp, Account, Transaction, TransferTransaction, TimeWindow, Address, XEM, HexMessage } from "nem-library";
import UserBlockchain from '../../models/UserBlockchain';

export function submitTransaction(message: string, id: string, callBackFunction: Function): void {
    if (message) {

        const transactionHttp = new TransactionHttp();

        const privateKey: string = process.env.REACT_APP_PRIVATE_KEY || '';

        const account = Account.createWithPrivateKey(privateKey);
        
        const transferTransaction: Transaction = TransferTransaction.create(
            TimeWindow.createWithDeadline(),
            new Address(process.env.REACT_APP_ADDRESS_RECIPIENT || 'TBHZ6JJYAWAQU2JIX2GFTN4IKFI4XB4VH4GSTI2S'),
            new XEM(0),
            HexMessage.create(message)
        )

        const signedTransaction = account.signTransaction(transferTransaction);

        transactionHttp.announceTransaction(signedTransaction).subscribe(x => {
            console.log(x);
            if (x.message === 'SUCCESS') {
                console.log('Data has sent to block');
                let userBlockchain = new UserBlockchain(id, x.transactionHash.data);
                callBackFunction(userBlockchain);
            } else {
                console.log('Fail');
            }
        });
    } else {
        console.log('Message is required');
    }
}

export function getTransactionByHash(hash: string) {
    const transactionHttp = new TransactionHttp();
    transactionHttp.getByHash(hash).subscribe(transaction => {
        console.log(transaction);
    });
}

export * from './TransactionHttp';