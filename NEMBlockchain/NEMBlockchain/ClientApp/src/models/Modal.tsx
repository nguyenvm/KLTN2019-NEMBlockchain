export default class Modal {
    isShow: boolean;
    data: any;

    constructor(isShow: boolean, data?: any) {
        this.isShow = isShow;
        this.data = data || '';
    }
}