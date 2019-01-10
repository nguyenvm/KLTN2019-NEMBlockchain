using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterSellingDto
    {
        public string SellerId { get; set; }
        public int? Amount { get; set; }
        public double? Total { get; set; }
        public string SellTime { get; set; }
        public bool isExistedOnNem { get; set; }
    }
}
