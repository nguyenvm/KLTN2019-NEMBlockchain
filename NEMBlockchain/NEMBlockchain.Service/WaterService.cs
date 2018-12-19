using System.Threading.Tasks;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;
using NEMBlockchain.Contract.Water;
using NEMBlockchain.Service.Dtos;

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

        public async Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotal(PaginationInputBase input)
        {
            var waterConsumptions = dbWater
                .WaterConsumtionTotalViewModels
                .FromSql("Pro_GetWaterConsumptionsTotal");

            int totalCount = await waterConsumptions
                .CountAsync();

            var items = await waterConsumptions
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterConsumtionTotalDto>
            {
                Items = mapper.Map<WaterConsumtionTotalDto[]>(items),
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotalByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@LogTime", searchTerm);

            var waterConsumptions = dbWater
                .WaterConsumtionTotalViewModels
                .FromSql("Pro_GetWaterConsumptionsTotalByDate @LogTime", param);

            int totalCount = await waterConsumptions
                .CountAsync();

            var items = await waterConsumptions
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterConsumtionTotalDto> {
                Items = mapper.Map<WaterConsumtionTotalDto[]>(items),
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<WaterConsumptionDetailDto[]> GetWaterConsumptionDetail(string userId, string logTime)
        {
            var paramUserID = new SqlParameter("@UserID", userId);
            var paramLogTime = new SqlParameter("@LogTime", logTime);

            var waterConsumption = await dbWater
                .WaterConsumptionDetailViewModels
                .FromSql("Pro_GetWaterConsumptionDetailByUserIDAndByDate @UserID, @LogTime", paramUserID, paramLogTime).ToArrayAsync();

            return mapper.Map<WaterConsumptionDetailDto[]>(waterConsumption);
        }
    }
}
