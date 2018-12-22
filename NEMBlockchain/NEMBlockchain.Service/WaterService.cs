using System.Threading.Tasks;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;
using NEMBlockchain.Service.Dtos;
using System;

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

            return new PaginationSet<WaterConsumtionTotalDto>
            {
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

        public async Task<PaginationSet<WaterBuyingDto>> GetWaterBuyingList(PaginationInputBase input)
        {
            var waterBuyingList = dbWater
                .WaterBuyingViewModels
                .FromSql("Pro_GetWaterBuyingList");

            int totalCount = await waterBuyingList
                .CountAsync();

            var items = await waterBuyingList
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterBuyingDto>
            {
                Items = mapper.Map<WaterBuyingDto[]>(items),
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterBuyingDto>> GetWaterBuyingListByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@BuyTime", searchTerm);

            var waterBuyingList = dbWater
                .WaterBuyingViewModels
                .FromSql("Pro_GetWaterBuyingListByDate @BuyTime", param);

            int totalCount = await waterBuyingList
                .CountAsync();

            var items = await waterBuyingList
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterBuyingDto>
            {
                Items = mapper.Map<WaterBuyingDto[]>(items),
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterSellingDto>> GetWaterSellingList(PaginationInputBase input)
        {
            var waterSellingList = dbWater
                .WaterSellingViewModels
                .FromSql("Pro_GetWaterSellingList");

            int totalCount = await waterSellingList
                .CountAsync();

            var items = await waterSellingList
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterSellingDto>
            {
                Items = mapper.Map<WaterSellingDto[]>(items),
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterSellingDto>> GetWaterSellingListByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@SellTime", searchTerm);

            var waterSellingList = dbWater
                .WaterSellingViewModels
                .FromSql("Pro_GetWaterSellingListByDate @SellTime", param);

            int totalCount = await waterSellingList
                .CountAsync();

            var items = await waterSellingList
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

            return new PaginationSet<WaterSellingDto>
            {
                Items = mapper.Map<WaterSellingDto[]>(items),
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }
    }
}
