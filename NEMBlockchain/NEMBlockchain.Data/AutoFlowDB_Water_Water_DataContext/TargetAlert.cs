using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext
{
    public partial class TargetAlert
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public DateTime CreateTime { get; set; }
        public double Usage { get; set; }
        public double Target { get; set; }
        public bool IsView { get; set; }
    }
}
