using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterSellingBlockchainDto
    {
        public string Id { get; set; }
        public DateTime SellTime { get; set; }
        public string TransactionHash { get; set; }
    }
}
