import { TransactionHttp, Account, Transaction, TransferTransaction, TimeWindow, Address, XEM, HexMessage } from "nem-library";
import UserBlockchain from '../../models/UserBlockchain';

export function submitTransaction(message: string, id: string, callBackFunction: Function): void {
    if (message) {

        const transactionHttp = new TransactionHttp();

        const privateKey: string = process.env.REACT_APP_PRIVATE_KEY || '';

        const account = Account.createWithPrivateKey(privateKey);
        
        // var NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0);

        // var receiveTimeStamp = 0;

        // fetch('http://23.228.67.85:7890/time-sync/network-time')
        //     .then(resJson => resJson.json())
        //     .then(res => receiveTimeStamp = res.receiveTimeStamp);

        // var createNEMTimeStamp = function createNEMTimeStamp() {
        //     return Math.floor((receiveTimeStamp / 1000) - (NEM_EPOCH / 1000));
        // };
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