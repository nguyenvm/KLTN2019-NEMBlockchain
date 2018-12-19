export default class WaterConsumptionDetail {
    userId: string;
    funitureName: string;
    volume: number;
    logTime: Date;

    constructor(
        userId: string,
        funitureName: string,
        volume: number,
        logTime: Date
    ) {
        this.userId = userId;
        this.funitureName = funitureName;
        this.volume = volume;
        this.logTime = logTime;
    }
}