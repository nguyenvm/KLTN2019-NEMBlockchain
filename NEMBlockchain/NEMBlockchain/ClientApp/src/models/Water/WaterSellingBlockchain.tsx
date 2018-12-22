export default class WaterSellingBlockchain {
    id: string;
    sellTime: string;
    transactionHash?: string;

    constructor(
        id: string,
        sellTime: string,
        transactionHash?: string
    ) {
        this.id = id;
        this.sellTime = sellTime;
        this.transactionHash = transactionHash;
    }
}