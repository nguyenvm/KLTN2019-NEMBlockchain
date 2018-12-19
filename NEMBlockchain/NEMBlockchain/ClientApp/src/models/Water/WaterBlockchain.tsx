export default class WaterBlockchain {
    Id: string;
    LogTime: Date;
    TransactionHash?: string;
    
    constructor(
        id: string,
        logTime: Date,
        transactionHash?: string
    ) {
        this.Id = id;
        this.LogTime = logTime;
        this.TransactionHash = transactionHash;
    }
}