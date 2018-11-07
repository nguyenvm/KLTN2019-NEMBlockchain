import { TransactionHttp, Account, Transaction, TransferTransaction, TimeWindow, Address, XEM, HexMessage } from "nem-library";

export function submitTransaction(message: string): void {
    if (message) {
        const transactionHttp = new TransactionHttp();

        const privateKey: string = process.env.REACT_APP_PRIVATE_KEY || '';
    
        const account = Account.createWithPrivateKey(privateKey);
    
        const transferTransaction: Transaction = TransferTransaction.create(
            TimeWindow.createWithDeadline(),
            new Address(process.env.REACT_APP_ADDRESS_RECIPIENT || 'TBHZ6JJYAWAQU2JIX2GFTN4IKFI4XB4VH4GSTI2S'),
            new XEM(0),
            HexMessage.create(message)
        );
    
        const signedTransaction = account.signTransaction(transferTransaction);
        transactionHttp.announceTransaction(signedTransaction).subscribe(x => {
            console.log(x);
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