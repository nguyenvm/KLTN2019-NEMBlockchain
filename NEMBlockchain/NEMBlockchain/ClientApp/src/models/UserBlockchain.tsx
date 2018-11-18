export default class UserBlockchain {
    Id: string;
    TransactionHash?: string;

    constructor(
        id: string,
        transactionHash?: string
    ) {
        this.Id = id;
        this.TransactionHash = transactionHash;
    }
}