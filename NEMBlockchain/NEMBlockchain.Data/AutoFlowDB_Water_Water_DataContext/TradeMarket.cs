using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext
{
    public partial class TradeMarket
    {
        public TradeMarket()
        {
            TradeLog = new HashSet<TradeLog>();
        }

        public string Id { get; set; }
        public string SellerId { get; set; }
        public int? Amount { get; set; }
        public double? Total { get; set; }
        public DateTime? SellTime { get; set; }
        public DateTime? UpdateTime { get; set; }
        public bool? IsSold { get; set; }

        public ICollection<TradeLog> TradeLog { get; set; }
    }
}
