export class UserInfo {
    Id: string;
    Address: string;
    FullName: string;
    PhoneNumber: string;
    Gender: number;
    WaterSupplierId: number;
    CreateDate: Date;
    PendingStatus: number;
    Coin: number;
    Latitude: string;
    Longitude: string;
    IsActive: boolean;
    AccountType: number;
    SerialNumber: string;

    constructor(
        Id: string,
        Address: string,
        FullName: string,
        PhoneNumber: string,
        Gender: number,
        WaterSupplierId: number,
        CreateDate: Date,
        PendingStatus: number,
        Coin: number,
        Latitude: string,
        Longitude: string,
        IsActive: boolean,
        AccountType: number,
        SerialNumber: string
    ) {
        this.Id = Id || '';
        this.Address = Address || '';
        this.FullName = FullName || '';
        this.PhoneNumber = PhoneNumber || '';
        this.Gender = Gender;
        this.WaterSupplierId = WaterSupplierId;
        this.CreateDate = CreateDate || '';
        this.PendingStatus = PendingStatus;
        this.Coin = Coin;
        this.Latitude = Latitude || '';
        this.Longitude = Longitude || '';
        this.IsActive = IsActive || false;
        this.AccountType = AccountType;
        this.SerialNumber = SerialNumber || '';
    }
}