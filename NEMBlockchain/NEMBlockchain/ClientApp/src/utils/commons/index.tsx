import utf8 from 'utf8';
import { SHA256 } from 'crypto-js';
import { TransactionHttp } from "nem-library";

export function decodePayloadTransation(payload: string): string {
    let str = "";
    for (let i = 0; i < payload.length; i += 2)
        str += String.fromCharCode(parseInt(payload.substr(i, 2), 16));
    try {
        console.log(utf8.decode(str));
        return utf8.decode(str);
    } catch (e) {
        console.log(e);
        return str;
    }
}

export function hashData(data: any): string {
    console.log(data);
    const hash: string = SHA256(JSON.stringify(data)).toString();
    console.log('Hashed: ', hash);
    return hash;
}

export function decodeHexMessageTransaction(hex: string): string {
    if (hex) {
        return hex.substring(2);
    } else {
        console.log('HexMessage is required');
        return hex;
    }
}

export function checkDataHasChanged(transactionHash: string, hexCompare: string, callBackFunction: Function) {
    const transactionHttp = new TransactionHttp();

    if (transactionHash) {

        transactionHttp.getByHash(transactionHash).subscribe((transaction: any) => {
            console.log(transaction);

            let hex = decodeHexMessageTransaction(transaction.message.payload);

            if (hexCompare.toUpperCase() === hex.toUpperCase()) {
                callBackFunction(true, null);
                console.log('Data Valid');
            } else {
                callBackFunction(false, null);
                console.log('Data has changed');
            }
            
        }, (err: any) => {
            callBackFunction(null, false);
            console.log(err);
        });
    } else {
        callBackFunction(null, false);
        console.log('TransactionHash is required');
    }
}

export * from './index';