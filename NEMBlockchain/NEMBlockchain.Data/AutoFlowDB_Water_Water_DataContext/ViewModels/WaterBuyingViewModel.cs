using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext.ViewModels
{
    public class WaterBuyingViewModel
    {
        public string TradeId { get; set; }
        public string BuyerId { get; set; }
        public DateTime BuyTime { get; set; }
        public double? Total { get; set; }
    }
}
