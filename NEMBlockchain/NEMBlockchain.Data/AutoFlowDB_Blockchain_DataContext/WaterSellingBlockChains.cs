using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext
{
    public partial class WaterSellingBlockChains
    {
        public string Id { get; set; }
        public DateTime SellTime { get; set; }
        public string TransactionHash { get; set; }
    }
}
