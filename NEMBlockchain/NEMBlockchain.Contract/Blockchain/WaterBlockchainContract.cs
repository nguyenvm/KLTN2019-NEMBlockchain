using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NEMBlockchain.Contract.Blockchain
{
    public class WaterBlockchainContract
    {
        [DataType(DataType.Text)]
        [MaxLength(128)]
        public string Id { get; set; }
        public DateTime LogTime { get; set; }
        [DataType(DataType.Text)]
        [MaxLength(64)]
        public string TransactionHash { get; set; }
    }
}
