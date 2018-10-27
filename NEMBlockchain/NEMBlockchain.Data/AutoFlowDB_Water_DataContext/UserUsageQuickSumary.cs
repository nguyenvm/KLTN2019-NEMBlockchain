using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_DataContext
{
    public partial class UserUsageQuickSumary
    {
        public string UserId { get; set; }
        public DateTime? StartTimeLog { get; set; }
        public DateTime? LatestTimeLog { get; set; }
        public DateTime? LatestTimeSumary { get; set; }
    }
}
