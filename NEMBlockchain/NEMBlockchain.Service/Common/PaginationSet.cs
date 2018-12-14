using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Common
{
    public class PaginationSet<T> : PaginationInputBase
    {
        public int TotalCount { get; set; }
        public T[] Items { get; set; }
    }
}
