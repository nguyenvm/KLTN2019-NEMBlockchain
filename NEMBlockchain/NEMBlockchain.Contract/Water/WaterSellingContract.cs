using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Contract.Water
{
    public class WaterSellingContract
    {
        public string SellerId { get; set; }
        public int? Amount { get; set; }
        public double? Total { get; set; }
        public string SellTime { get; set; }
        public bool isExistedOnNem { get; set; }
    }
}
