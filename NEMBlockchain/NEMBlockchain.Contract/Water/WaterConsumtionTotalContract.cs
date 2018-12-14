using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Contract.Water
{
    public class WaterConsumtionTotalContract
    {
        public string UserId { get; set; }
        public double? TotalVolume { get; set; }
        public DateTime? LogTime { get; set; }
    }
}
