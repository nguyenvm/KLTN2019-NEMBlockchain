using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NEMBlockchain.Contract.Blockchain
{
    public class UserBlockchainContract
    {
        [DataType(DataType.Text)]
        [MaxLength(128)]
        public string Id { get; set; }
        [DataType(DataType.Text)]
        [MaxLength(64)]
        public string TransactionHash { get; set; }
    }
}
