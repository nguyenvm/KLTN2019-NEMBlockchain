using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext
{
    public partial class WaterBuyingBlockChains
    {
        public string Id { get; set; }
        public DateTime BuyTime { get; set; }
        public string TransactionHash { get; set; }
    }
}
