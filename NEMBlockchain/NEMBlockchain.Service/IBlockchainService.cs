﻿using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IBlockchainService
    {
        Task<UserBlockchainDto> InsertUserBlockchain(UserBlockchainDto userBlockchainDto);
        Task<UserBlockchainDto> CheckExistUserBlockchain(string userId);
        Task<WaterBlockchainDto> InsertWaterBlockchain(WaterBlockchainDto waterBlockchainDto);
        Task<WaterBlockchainDto> CheckExistWaterBlockchain(string id);
    }
}
