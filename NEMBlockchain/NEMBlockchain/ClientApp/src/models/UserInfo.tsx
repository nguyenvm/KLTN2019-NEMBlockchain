export default class UserInfo {
    [key: string]: any;
    id: string;
    address: string;
    fullName: string;
    phoneNumber: string;
    gender: number;
    waterSupplierId: number;
    createDate: Date;
    pendingStatus: number;
    coin: number;
    latitude: string;
    longitude: string;
    isActive: boolean;
    accountType: number;
    serialNumber: string;

    constructor(
        id: string,
        address: string,
        fullName: string,
        phoneNumber: string,
        gender: number,
        waterSupplierId: number,
        createDate: Date,
        pendingStatus: number,
        coin: number,
        latitude: string,
        longitude: string,
        isActive: boolean,
        accountType: number,
        serialNumber: string
    ) {
        this.id = id || '';
        this.address = address || '';
        this.fullName = fullName || '';
        this.phoneNumber = phoneNumber || '';
        this.gender = gender;
        this.waterSupplierId = waterSupplierId;
        this.createDate = createDate || '';
        this.pendingStatus = pendingStatus;
        this.coin = coin;
        this.latitude = latitude || '';
        this.longitude = longitude || '';
        this.isActive = isActive || false;
        this.accountType = accountType;
        this.serialNumber = serialNumber || '';
    }
}