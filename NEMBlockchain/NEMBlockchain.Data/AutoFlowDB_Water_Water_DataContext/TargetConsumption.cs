using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext
{
    public partial class TargetConsumption
    {
        public string UserId { get; set; }
        public double Target { get; set; }
        public byte NotificationPercent { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
    }
}
