using NEMBlockchain.Contract.Water;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IWaterService
    {
        Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotal(PaginationInputBase input);
        Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotalByDate(PaginationInputBase input);
        Task<WaterConsumptionDetailDto[]> GetWaterConsumptionDetail(string userId, string logTime);
    }
}
