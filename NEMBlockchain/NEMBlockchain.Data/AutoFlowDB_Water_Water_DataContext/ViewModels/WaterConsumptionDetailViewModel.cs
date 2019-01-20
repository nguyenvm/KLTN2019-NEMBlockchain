using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext.ViewModels
{
    public class WaterConsumptionDetailViewModel
    {
        public string UserId { get; set; }
        public string FunitureName { get; set; }
        public decimal? Volume { get; set; }
        public DateTime? LogTime { get; set; }
    }
}
