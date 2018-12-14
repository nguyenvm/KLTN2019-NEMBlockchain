namespace NEMBlockchain.Service.Common
{
    public class PaginationInputBase
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        private string searchTerm;
        public string SearchTerm
        {
            get
            {
                return searchTerm;
            }
            set
            {
                searchTerm = string.IsNullOrEmpty(value) ? "" : value;
            }
        }
        public string OrderBy { get; set; }
        public bool IsOrderAscending { get; set; }
    }
}
