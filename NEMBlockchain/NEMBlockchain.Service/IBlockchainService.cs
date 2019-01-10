using NEMBlockchain.Service.Dtos;
using System;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IBlockchainService
    {
        Task<UserBlockchainDto> InsertUserBlockchain(UserBlockchainDto userBlockchainDto);
        Task<UserBlockchainDto> CheckExistUserBlockchain(string userId);
        Task<WaterBlockchainDto> InsertWaterBlockchain(WaterBlockchainDto waterBlockchainDto);
        Task<WaterBlockchainDto> CheckExistWaterBlockchain(string id, DateTime logTime);
        Task<WaterBuyingBlockchainDto> InsertWaterBuyingBlockchain(WaterBuyingBlockchainDto waterBuyingBlockchainDto);
        Task<WaterBuyingBlockchainDto> CheckExistWaterBuyingBlockchain(string id, DateTime buyTime);
        Task<WaterSellingBlockchainDto> InsertWaterSellingBlockchain(WaterSellingBlockchainDto waterSellingBlockchainDto);
        Task<WaterSellingBlockchainDto> CheckExistWaterSellingBlockchain(string id, DateTime sellTime);
    }
}
