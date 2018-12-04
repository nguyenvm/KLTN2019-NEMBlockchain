using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Electricity_DataContext
{
    public partial class UserWaterAmount
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public int? Amount { get; set; }
        public int? Month { get; set; }
        public int? Year { get; set; }
    }
}
