using NEMBlockchain.Service.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IBlockchainService
    {
        Task<UserBlockchainDto> InsertUserBlockchain(UserBlockchainDto userBlockchainDto);
        Task<UserBlockchainDto> CheckExistUserBlockchain(string userId);
    }
}
