using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterConsumptionDetailDto
    {
        public string UserId { get; set; }
        public string FunitureName { get; set; }
        public double? Volume { get; set; }
        public DateTime? LogTime { get; set; }
    }
}
