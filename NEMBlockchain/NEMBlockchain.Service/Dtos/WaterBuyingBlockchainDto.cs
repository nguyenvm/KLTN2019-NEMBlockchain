using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class WaterBuyingBlockchainDto
    {
        public string Id { get; set; }
        public DateTime BuyTime { get; set; }
        public string TransactionHash { get; set; }
    }
}
