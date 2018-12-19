using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext
{
    public partial class WaterBlockChains
    {
        public string Id { get; set; }
        public DateTime LogTime { get; set; }
        public string TransactionHash { get; set; }
    }
}
