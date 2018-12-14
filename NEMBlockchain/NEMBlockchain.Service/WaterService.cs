using System.Threading.Tasks;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;
using NEMBlockchain.Contract.Water;

namespace NEMBlockchain.Service
{
    public class WaterService : IWaterService
    {
        private readonly IMapper mapper;
        private readonly AutoFlowDB_Water_WaterContext dbWater;

        public WaterService(IMapper mapper, AutoFlowDB_Water_WaterContext dbWater)
        {
            this.dbWater = dbWater;
            this.mapper = mapper;
        }
        
        public async Task<PaginationSet<WaterConsumtionTotalContract>> GetWaterConsumptionsTotalByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@LogTime", searchTerm);

            var waterConsumptions = dbWater
                .WaterConsumtionTotalContract
                .FromSql("Pro_GetWaterConsumptionsTotalByDate @LogTime", param);

            int totalCount = await waterConsumptions
                .CountAsync();

            var items = await waterConsumptions
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterConsumtionTotalContract> {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<WaterConsumptionDetailContract[]> GetWaterConsumptionDetail(string userId, string logTime)
        {
            var paramUserID = new SqlParameter("@UserID", userId);
            var paramLogTime = new SqlParameter("@LogTime", logTime);

            var waterConsumption = await dbWater
                .WaterConsumptionDetailContract
                .FromSql("Pro_GetWaterConsumptionDetailByUserIDAndByDate @UserID, @LogTime", paramUserID, paramLogTime).ToArrayAsync();

            return waterConsumption;
        }
    }
}
