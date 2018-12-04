using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Electricity_DataContext
{
    public partial class FunitureCategory
    {
        public FunitureCategory()
        {
            UserUsageLog = new HashSet<UserUsageLog>();
            UserUsageSumary = new HashSet<UserUsageSumary>();
        }

        public int Id { get; set; }
        public string FunitureName { get; set; }
        public int? Frequency { get; set; }
        public bool? IsActive { get; set; }

        public ICollection<UserUsageLog> UserUsageLog { get; set; }
        public ICollection<UserUsageSumary> UserUsageSumary { get; set; }
    }
}
