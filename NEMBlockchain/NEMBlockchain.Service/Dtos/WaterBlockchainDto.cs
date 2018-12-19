using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterBlockchainDto
    {
        public string Id { get; set; }
        public DateTime LogTime { get; set; }
        public string TransactionHash { get; set; }
    }
}
