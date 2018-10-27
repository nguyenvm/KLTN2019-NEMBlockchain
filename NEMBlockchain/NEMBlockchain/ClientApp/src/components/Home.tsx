import React, { Component } from 'react';
import { BlockHttp, NEMLibrary, NetworkTypes, AccountHttp, Address } from 'nem-library';
import { SHA256 } from 'crypto-js';
import callApi from 'src/utils/apiCaller';
import { UserInfo } from 'src/models/UserInfo';
import utf8 from 'utf8';

class Home extends Component<any, any> {
    constructor(props: any) {
        super(props);
        NEMLibrary.bootstrap(NetworkTypes.TEST_NET);

        this.showBlock = this.showBlock.bind(this);
        this.getAllTransation = this.getAllTransation.bind(this);
        this.getFirstAccount = this.getFirstAccount.bind(this);
        this.hashUserInfo = this.hashUserInfo.bind(this);

        this.state = {
            block: Object,
            accountInfo: UserInfo,
            hashData: String
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.showBlock}>Show info block</button>
                <button onClick={this.getAllTransation}>Show all transaction</button>
                <button onClick={this.getFirstAccount}>Get First Account</button>
                <button onClick={this.hashUserInfo}>SHA256 UserInfo</button>
                <button onClick={}>Decode Hex</button>
                <br />
                {JSON.stringify(this.state.block)}
                <br />
                <br />
                <br />
                {JSON.stringify(this.state.accountInfo)}
                <br />
                <br />
                <br />
                {this.state.hashData}
            </div>
        );
    }

    getFirstAccount() {
        callApi('api/user/list', 'GET', null).then((res: any) => {
            console.log(res);
            const data: Array<Object> = [...res.data.data];
            const lastUserInfo: any = data.slice(-1)[0];

            const userInfo = new UserInfo(
                lastUserInfo.id,
                lastUserInfo.address,
                lastUserInfo.fullName,
                lastUserInfo.phoneNumber,
                lastUserInfo.gender,
                lastUserInfo.waterSupplierId,
                lastUserInfo.createDate,
                lastUserInfo.pendingStatus,
                lastUserInfo.coin,
                lastUserInfo.latitude,
                lastUserInfo.longitude,
                lastUserInfo.isActive,
                lastUserInfo.accountType,
                lastUserInfo.serialNumber
            );
            this.setState({
                accountInfo: userInfo
            })
        });
    }

    showBlock() {
        const blockHttp = new BlockHttp();
        blockHttp.getBlockByHeight(1675802).subscribe(block => {
            console.log(block);
            this.setState({
                block: block
            })
        });
    }

    getAllTransation() {
        const accountHttp = new AccountHttp();
        const address = new Address('TDG2CJZTM7X2P6TX4L7M7XO7MJ27QTJ2X4JHZ2WU');

        accountHttp.allTransactions(address).subscribe(transaction => {
            console.log(transaction);
        });
    }

    hashUserInfo() {
        var hash = SHA256(JSON.stringify(this.state.accountInfo)).toString().toUpperCase();
        console.log(hash);

        this.setState({
            hashData: hash
        });
    }

    decodeHex(hex: string): string {
        let str = "";
        for (let i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        try {
            return utf8.decode(str);
        } catch (e) {
            return str;
        }
    }
}

export default Home;