using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Electricity_DataContext
{
    public partial class TradeLog
    {
        public string Id { get; set; }
        public string TradeId { get; set; }
        public string BuyerId { get; set; }
        public DateTime? BuyTime { get; set; }
        public int? Amount { get; set; }

        public TradeMarket Trade { get; set; }
    }
}
