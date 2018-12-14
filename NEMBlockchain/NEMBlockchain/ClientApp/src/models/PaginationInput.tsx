import * as Constants from '../contants';

export default class PaginationInput {
    pageIndex: number;
    pageSize: number;
    searchTerm: string;
    orderBy: string;
    isOrderAscending: boolean;

    constructor(
        pageIndex: number,
        pageSize: number,
        searchTerm?: string,
        orderBy?: string,
        isOrderAscending?: boolean,
    ) {
        this.pageIndex = pageIndex || Constants.DEFAULT_PAGE_INDEX;
        this.pageSize = pageSize || Constants.DEFAULT_ITEMS_PER_PAGE;
        this.searchTerm = searchTerm || '';
        this.orderBy = orderBy || '';
        this.isOrderAscending = isOrderAscending || false;
    }
}