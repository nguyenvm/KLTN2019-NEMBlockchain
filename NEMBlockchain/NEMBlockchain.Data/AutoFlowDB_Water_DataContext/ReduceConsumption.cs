using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Water_DataContext
{
    public partial class ReduceConsumption
    {
        public string UserId { get; set; }
        public double? ClothesWasherFlowrate { get; set; }
        public double? DishWasherFlowrate { get; set; }
        public double? ShowerFlowrate { get; set; }
        public double? TapFlowrate { get; set; }
        public double? ToiletVolume { get; set; }
    }
}
