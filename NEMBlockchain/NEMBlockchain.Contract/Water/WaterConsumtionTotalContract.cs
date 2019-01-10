using System;
using System.Globalization;

namespace NEMBlockchain.Contract.Water
{
    public class WaterConsumtionTotalContract
    {
        public string UserId { get; set; }
        public double? TotalVolume { get; set; }
        public DateTime LogTime { get; set; }
        public bool isExistedOnNem { get; set; }
    }
}
