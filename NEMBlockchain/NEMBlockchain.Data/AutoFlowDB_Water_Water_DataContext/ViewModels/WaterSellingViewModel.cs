using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext.ViewModels
{
    public class WaterSellingViewModel
    {
        public string SellerId { get; set; }
        public int? Amount { get; set; }
        public double? Total { get; set; }
        public DateTime? SellTime { get; set; }
    }
}
