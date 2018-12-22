export default class WaterBuyingBlockchain {
    id: string;
    buyTime: string;
    transactionHash?: string;

    constructor(
        id: string,
        buyTime: string,
        transactionHash?: string
    ) {
        this.id = id;
        this.buyTime = buyTime;
        this.transactionHash = transactionHash;
    }
}