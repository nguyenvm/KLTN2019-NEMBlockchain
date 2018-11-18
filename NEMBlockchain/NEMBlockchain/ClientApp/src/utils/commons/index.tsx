import utf8 from 'utf8';
import { SHA256 } from 'crypto-js';

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
    const hash: string = SHA256(JSON.stringify(data)).toString().toUpperCase();
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

// export function getLastAccount(): any{
//     callApi('api/user/list', 'GET', null).then((res: any) => {
//         const data: Array<Object> = [...res.data.data];
//         const lastUserInfo: any = data.slice(-1)[0];

//         const userInfo = new UserInfo(
//             lastUserInfo.id,
//             lastUserInfo.address,
//             lastUserInfo.fullName,
//             lastUserInfo.phoneNumber,
//             lastUserInfo.gender,
//             lastUserInfo.waterSupplierId,
//             lastUserInfo.createDate,
//             lastUserInfo.pendingStatus,
//             lastUserInfo.coin,
//             lastUserInfo.latitude,
//             lastUserInfo.longitude,
//             lastUserInfo.isActive,
//             lastUserInfo.accountType,
//             lastUserInfo.serialNumber
//         );
//         console.log(userInfo);
        
//     });
// }

export * from './index';