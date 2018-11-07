import { AccountHttp, Address } from "nem-library";

export function getAllTransation(): void {
    const accountHttp = new AccountHttp();
    const address = new Address(process.env.CREATE_APP_PRIMARY_ADDRESS || 'TDG2CJZTM7X2P6TX4L7M7XO7MJ27QTJ2X4JHZ2WU');

    accountHttp.allTransactions(address).subscribe(transaction => {
        console.log(transaction);
    });
}