using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Membership_DataContext
{
    public partial class Report
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string Message { get; set; }
        public DateTime CreateTime { get; set; }
        public int AreaType { get; set; }

        public UserInfo User { get; set; }
    }
}
