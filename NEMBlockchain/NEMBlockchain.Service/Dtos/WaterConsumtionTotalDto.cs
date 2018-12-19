using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterConsumtionTotalDto
    {
        public string UserId { get; set; }
        public double? TotalVolume { get; set; }
        public DateTime LogTime { get; set; }
    }
}
