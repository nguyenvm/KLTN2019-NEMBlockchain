export default class WaterBuying {
    tradeId: string;
    buyerId: string;
    total: number;
    buyTime: Date;

    constructor(
        tradeId: string,
        buyerId: string,
        total: number,
        buyTime: Date
    ) {
        this.tradeId = tradeId;
        this.buyerId = buyerId;
        this.total = total;
        this.buyTime = buyTime;
    }
}