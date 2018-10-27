using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Electricity_DataContext
{
    public partial class UserCategory
    {
        public string UserId { get; set; }
        public int CategoryId { get; set; }
        public bool Status { get; set; }
    }
}
