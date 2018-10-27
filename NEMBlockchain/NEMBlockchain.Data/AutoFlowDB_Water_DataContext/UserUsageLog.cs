using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_DataContext
{
    public partial class UserUsageLog
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public int CategoryId { get; set; }
        public double? Flow { get; set; }
        public DateTime? LogTime { get; set; }
        public double? Volume { get; set; }

        public FunitureCategory Category { get; set; }
    }
}
