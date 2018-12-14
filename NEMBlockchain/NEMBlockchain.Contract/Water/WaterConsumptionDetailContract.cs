using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NEMBlockchain.Contract.Water
{
    public class WaterConsumptionDetailContract
    {
        public string UserId { get; set; }
        public string FunitureName { get; set; }
        public double? Volume { get; set; }
        public DateTime? LogTime { get; set; }
    }
}
