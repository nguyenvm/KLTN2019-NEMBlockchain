using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Electricity_DataContext
{
    public partial class TargetConsumption
    {
        public string UserId { get; set; }
        public double Target { get; set; }
        public DateTime StartDay { get; set; }
        public DateTime EndDay { get; set; }
        public byte NotificationPercent { get; set; }
    }
}
