using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext.ViewModels
{
    public class WaterConsumtionTotalViewModel
    {
        public string UserId { get; set; }
        public decimal? TotalVolume { get; set; }
        public DateTime LogTime { get; set; }
    }
}
