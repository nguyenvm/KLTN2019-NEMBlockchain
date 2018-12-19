export default class WaterConsumptionTotal {
    userId: string;
    totalVolume: number;
    logTime: Date;

    constructor(
        userId: string,
        totalVolume: number,
        logTime: Date
    ) {
        this.userId = userId;
        this.totalVolume = totalVolume;
        this.logTime = logTime;
    }
}