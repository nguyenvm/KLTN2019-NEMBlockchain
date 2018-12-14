import PaginationInput from './PaginationInput';

export default class PaginationResult<T> extends PaginationInput {
    totalCount: number;
    items: Array<T>;
    
    constructor(
        totalCount: number,
        items: Array<T>,
        pageIndex: number,
        pageSize: number,
        searchTerm?: string,
        orderBy?: string,
        isOrderAscending?: boolean
    ) {
        super(pageIndex, pageSize, searchTerm, orderBy, isOrderAscending);
        
        this.totalCount = totalCount || 0;
        this.items = items || [];
    }
    
}