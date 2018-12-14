using NEMBlockchain.Contract.Water;
using NEMBlockchain.Service.Common;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IWaterService
    {
        Task<PaginationSet<WaterConsumtionTotalContract>> GetWaterConsumptionsTotalByDate(PaginationInputBase input);
        Task<WaterConsumptionDetailContract[]> GetWaterConsumptionDetail(string userId, string logTime);
    }
}
