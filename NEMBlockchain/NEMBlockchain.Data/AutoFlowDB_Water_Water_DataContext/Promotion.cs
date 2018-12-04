using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext
{
    public partial class Promotion
    {
        public string Id { get; set; }
        public int? CategoryId { get; set; }
        public string Name { get; set; }
        public string Link { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? Active { get; set; }

        public FunitureCategory Category { get; set; }
    }
}
