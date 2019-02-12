using NEMBlockchain.Contract.Water;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IWaterService
    {
        Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotal(PaginationInputBase input);
        Task<PaginationSet<WaterConsumtionTotalDto>> GetListWaterNotExistOnBlockchain(PaginationInputBase input);
        Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotalByDate(PaginationInputBase input);
        Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsNotExistOnBlockchainTotalByDate(PaginationInputBase input);
        Task<WaterConsumptionDetailDto[]> GetWaterConsumptionDetail(string userId, string logTime);
        Task<PaginationSet<WaterBuyingDto>> GetWaterBuyingList(PaginationInputBase input);
        Task<PaginationSet<WaterBuyingDto>> GetWaterBuyingListByDate(PaginationInputBase input);
        Task<PaginationSet<WaterSellingDto>> GetWaterSellingList(PaginationInputBase input);
        Task<PaginationSet<WaterSellingDto>> GetWaterSellingListByDate(PaginationInputBase input);
    }
}
