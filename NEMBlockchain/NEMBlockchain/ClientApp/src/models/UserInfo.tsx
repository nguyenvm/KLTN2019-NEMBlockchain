export default class UserInfo {
    [key: string]: any;
    id: string;
    fullName: string;
    userName: string;
    email: string;
    address: string;
    longitude: string;
    latitude: string;

    constructor(
        id: string,
        fullName: string,
        userName: string,
        email: string,
        address: string,
        longitude: string,
        latitude: string
    ) {
        this.id = id || '';
        this.fullName = fullName || '';
        this.userName = userName || '';
        this.email = email || '';
        this.address = address || '';
        this.longitude = longitude || '';
        this.latitude = latitude || '';
    }
}