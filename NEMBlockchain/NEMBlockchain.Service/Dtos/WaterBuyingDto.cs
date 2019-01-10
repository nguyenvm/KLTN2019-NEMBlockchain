using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterBuyingDto
    {
        public string TradeId { get; set; }
        public string BuyerId { get; set; }
        public string BuyTime { get; set; }
        public double? Total { get; set; }
        public bool isExistedOnNem { get; set; }
    }
}
