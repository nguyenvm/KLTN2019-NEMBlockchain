import { TransactionHttp, Account, Transaction, TransferTransaction, TimeWindow, Address, XEM, HexMessage } from "nem-library";
import UserBlockchain from '../../models/User/UserBlockchain';
import callApi from '../apiCaller';
import * as ActionTypes from 'src/contants/ActionTypes';
import WaterBlockchain from "src/models/Water/WaterBlockchain";
import WaterBuyingBlockchain from "src/models/Water/WaterBuyingBlockchain";
import WaterSellingBlockchain from "src/models/Water/WaterSellingBlockchain";

export function submitTransaction(message: string, type: string, data: any, callBackFunction: Function): void {
    if (message) {

        const transactionHttp = new TransactionHttp();

        const privateKey: string = process.env.REACT_APP_PRIVATE_KEY || '';

        const account = Account.createWithPrivateKey(privateKey);

        callApi(String(process.env.REACT_APP_TIME_SYNC_NODE), 'GET', null)
            .then((res: any) => {
                const transferTransaction: Transaction = TransferTransaction.create(
                    TimeWindow.createWithDeadline(res.data.receiveTimeStamp),
                    new Address(process.env.REACT_APP_RECIPIENT_ADDRESS || 'TBHZ6JJYAWAQU2JIX2GFTN4IKFI4XB4VH4GSTI2S'),
                    new XEM(0),
                    HexMessage.create(message)
                )

                const signedTransaction = account.signTransaction(transferTransaction);

                // transactionHttp.announceTransaction(signedTransaction).subscribe(x => {
                //     console.log(x);
                //     if (x.message === 'SUCCESS') {
                //         console.log('Data has sent to block');

                        switch (type) {
                            case ActionTypes.ADD_USER_BLOCK_CHAIN:
                                let userBlockchain = new UserBlockchain(data.id, 'x.transactionHash.data');
                                callBackFunction(userBlockchain, data);
                                break;
                            case ActionTypes.ADD_WATER_CONSUMPTION_BLOCK_CHAIN:
                                let waterBlockchain = new WaterBlockchain(data[0].userId, data[0].logTime, 'x.transactionHash.data');
                                callBackFunction(waterBlockchain, data);
                                break;
                            case ActionTypes.ADD_WATER_BUYING_BLOCK_CHAIN:
                                let waterBuyingBlockchain = new WaterBuyingBlockchain(data.buyerId, data.buyTime, 'x.transactionHash.data');
                                callBackFunction(waterBuyingBlockchain);
                                break;
                            case ActionTypes.ADD_WATER_SELLING_BLOCK_CHAIN:
                                let waterSellingBlockchain = new WaterSellingBlockchain(data.sellerId, data.sellTime, 'x.transactionHash.data');
                                callBackFunction(waterSellingBlockchain);
                                break;
                            default:
                                break;
                        }

                //     } else {
                //         console.log('Fail');
                //     }
                // });
            })
            .catch((err: any) => {
                callBackFunction(null);
                console.log('Error Submit Transaction: ', err);
            })
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


// // var NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0);

// // var receiveTimeStamp = 0;

// // fetch('http://23.228.67.85:7890/time-sync/network-time')
// //     .then(resJson => resJson.json())
// //     .then(res => receiveTimeStamp = res.receiveTimeStamp);

// // var createNEMTimeStamp = function createNEMTimeStamp() {
// //     return Math.floor((receiveTimeStamp / 1000) - (NEM_EPOCH / 1000));
// // };

export * from './TransactionHttp';