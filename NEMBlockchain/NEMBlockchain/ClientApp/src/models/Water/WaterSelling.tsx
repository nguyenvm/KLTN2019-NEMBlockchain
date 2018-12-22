export default class WaterSelling {
    sellerId: string;
    amount: number;
    total: number;
    sellTime: Date;

    constructor(
        sellerId: string,
        amount: number,
        total: number,
        sellTime: Date
    ) {
        this.sellerId = sellerId;
        this.amount = amount;
        this.total = total;
        this.sellTime = sellTime;
    }
}