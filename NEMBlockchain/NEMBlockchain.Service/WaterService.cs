using System.Threading.Tasks;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data.SqlClient;
using NEMBlockchain.Service.Dtos;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext.ViewModels;
using System.Collections.Generic;
using System;

namespace NEMBlockchain.Service
{
    public class WaterService : IWaterService
    {
        private readonly IMapper mapper;
        private readonly AutoFlowDB_Water_WaterContext dbWater;
        private readonly AutoFlowDB_BlockchainContext dbBlockchain;

        public WaterService(IMapper mapper, AutoFlowDB_Water_WaterContext dbWater, AutoFlowDB_BlockchainContext dbBlockchain)
        {
            this.dbWater = dbWater;
            this.dbBlockchain = dbBlockchain;
            this.mapper = mapper;
        }

        public async Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsTotal(PaginationInputBase input)
        {
            var waterConsumptions = dbWater
                .WaterConsumtionTotalViewModels
                .FromSql("Pro_GetWaterConsumptionsTotal");

            var listWaterConsumption = mapper.Map<List<WaterConsumtionTotalDto>>(waterConsumptions.ToList());

            for (int i = 0; i < listWaterConsumption.Count; i++)
            {
                var waterBlockchain = await dbBlockchain
                                        .WaterBlockChains
                                        .FirstOrDefaultAsync(w => w.Id == listWaterConsumption[i].UserId && w.LogTime == listWaterConsumption[i].LogTime);

                if (waterBlockchain != null)
                {
                    listWaterConsumption[i].isExistedOnNem = true;
                }
                else
                {
                    listWaterConsumption[i].isExistedOnNem = false;
                }
            }

            int totalCount = await waterConsumptions
                .CountAsync();

            //var items = await waterConsumptions
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listWaterConsumption
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterConsumtionTotalDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterConsumtionTotalDto>> GetListWaterNotExistOnBlockchain(PaginationInputBase input)
        {
            var waterConsumptions = dbWater
                .WaterConsumtionTotalViewModels
                .FromSql("Pro_GetWaterConsumptionsTotal");

            var listWaterConsumption = mapper.Map<List<WaterConsumtionTotalDto>>(waterConsumptions.ToList());
            List<WaterConsumtionTotalDto> listWaterNotExistOnBlockchain = new List<WaterConsumtionTotalDto>();

            for (int i = 0; i < listWaterConsumption.Count; i++)
            {
                var waterBlockchain = await dbBlockchain
                                        .WaterBlockChains
                                        .FirstOrDefaultAsync(w => w.Id == listWaterConsumption[i].UserId && w.LogTime == listWaterConsumption[i].LogTime);

                if (waterBlockchain == null)
                {
                    listWaterConsumption[i].isExistedOnNem = false;
                    listWaterNotExistOnBlockchain.Add(listWaterConsumption[i]);
                }
            }

            int totalCount = listWaterNotExistOnBlockchain.Count;

            var items = listWaterNotExistOnBlockchain
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterConsumtionTotalDto>
            {
                Items = items,
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

            var listWaterConsumption = mapper.Map<List<WaterConsumtionTotalDto>>(waterConsumptions.ToList());

            for (int i = 0; i < listWaterConsumption.Count; i++)
            {
                var waterBlockchain = await dbBlockchain
                                        .WaterBlockChains
                                        .FirstOrDefaultAsync(w => w.Id == listWaterConsumption[i].UserId && w.LogTime == listWaterConsumption[i].LogTime);

                if (waterBlockchain != null)
                {
                    listWaterConsumption[i].isExistedOnNem = true;
                }
                else
                {
                    listWaterConsumption[i].isExistedOnNem = false;
                }
            }

            int totalCount = await waterConsumptions
                .CountAsync();

            //var items = await waterConsumptions
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listWaterConsumption
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterConsumtionTotalDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterConsumtionTotalDto>> GetWaterConsumptionsNotExistOnBlockchainTotalByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@LogTime", searchTerm);

            var waterConsumptions = dbWater
                .WaterConsumtionTotalViewModels
                .FromSql("Pro_GetWaterConsumptionsTotalByDate @LogTime", param);

            var listWaterConsumption = mapper.Map<List<WaterConsumtionTotalDto>>(waterConsumptions.ToList());
            List<WaterConsumtionTotalDto> listWaterNotExistOnBlockchain = new List<WaterConsumtionTotalDto>();

            for (int i = 0; i < listWaterConsumption.Count; i++)
            {
                var waterBlockchain = await dbBlockchain
                                        .WaterBlockChains
                                        .FirstOrDefaultAsync(w => w.Id == listWaterConsumption[i].UserId && w.LogTime == listWaterConsumption[i].LogTime);

                if (waterBlockchain == null)
                {
                    listWaterConsumption[i].isExistedOnNem = false;
                    listWaterNotExistOnBlockchain.Add(listWaterConsumption[i]);
                }
            }

            int totalCount = listWaterNotExistOnBlockchain.Count;

            var items = listWaterNotExistOnBlockchain
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterConsumtionTotalDto>
            {
                Items = items,
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

            var listWaterBuying = mapper.Map<List<WaterBuyingDto>>(waterBuyingList.ToList());

            for (int i = 0; i < listWaterBuying.Count; i++)
            {
                var waterBuyingBlockchain = await dbBlockchain
                                                .WaterBuyingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterBuying[i].BuyerId && w.BuyTime == DateTime.Parse(listWaterBuying[i].BuyTime));

                if (waterBuyingBlockchain != null)
                {
                    listWaterBuying[i].isExistedOnNem = true;
                }
                else
                {
                    listWaterBuying[i].isExistedOnNem = false;
                }
            }


            int totalCount = await waterBuyingList
                .CountAsync();

            //var items = await waterBuyingList
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listWaterBuying
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterBuyingDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterBuyingDto>> GetWaterBuyingListNotExistOnBlockchain(PaginationInputBase input)
        {
            var waterBuyingList = dbWater
                .WaterBuyingViewModels
                .FromSql("Pro_GetWaterBuyingList");

            var listWaterBuying = mapper.Map<List<WaterBuyingDto>>(waterBuyingList.ToList());

            List<WaterBuyingDto> listWaterNotExistOnBlockchain = new List<WaterBuyingDto>();

            for (int i = 0; i < listWaterBuying.Count; i++)
            {
                var waterBuyingBlockchain = await dbBlockchain
                                                .WaterBuyingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterBuying[i].BuyerId && w.BuyTime == DateTime.Parse(listWaterBuying[i].BuyTime));

                if (waterBuyingBlockchain == null)
                {
                    listWaterBuying[i].isExistedOnNem = false;
                    listWaterNotExistOnBlockchain.Add(listWaterBuying[i]);
                }
            }


            int totalCount = listWaterNotExistOnBlockchain.Count;

            var items = listWaterNotExistOnBlockchain
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterBuyingDto>
            {
                Items = items,
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

            var listWaterBuying = mapper.Map<List<WaterBuyingDto>>(waterBuyingList.ToList());

            for (int i = 0; i < listWaterBuying.Count; i++)
            {
                var waterBuyingBlockchain = await dbBlockchain
                                                .WaterBuyingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterBuying[i].BuyerId && w.BuyTime == DateTime.Parse(listWaterBuying[i].BuyTime));

                if (waterBuyingBlockchain != null)
                {
                    listWaterBuying[i].isExistedOnNem = true;
                }
                else
                {
                    listWaterBuying[i].isExistedOnNem = false;
                }
            }

            int totalCount = await waterBuyingList
                .CountAsync();

            //var items = await waterBuyingList
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listWaterBuying
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterBuyingDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterBuyingDto>> GetWaterBuyingListNotExistOnBlockchainByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@BuyTime", searchTerm);

            var waterBuyingList = dbWater
                .WaterBuyingViewModels
                .FromSql("Pro_GetWaterBuyingListByDate @BuyTime", param);

            var listWaterBuying = mapper.Map<List<WaterBuyingDto>>(waterBuyingList.ToList());

            List<WaterBuyingDto> listWaterNotExistOnBlockchain = new List<WaterBuyingDto>();

            for (int i = 0; i < listWaterBuying.Count; i++)
            {
                var waterBuyingBlockchain = await dbBlockchain
                                                .WaterBuyingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterBuying[i].BuyerId && w.BuyTime == DateTime.Parse(listWaterBuying[i].BuyTime));

                if (waterBuyingBlockchain == null)
                {
                    listWaterBuying[i].isExistedOnNem = false;
                    listWaterNotExistOnBlockchain.Add(listWaterBuying[i]);
                }
            }

            int totalCount = listWaterNotExistOnBlockchain.Count;

            var items = listWaterNotExistOnBlockchain
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterBuyingDto>
            {
                Items = items,
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

            var listWaterSelling = mapper.Map<List<WaterSellingDto>>(waterSellingList.ToList());

            for (int i = 0; i < listWaterSelling.Count; i++)
            {
                var waterSellingBlockchain = await dbBlockchain
                                                .WaterSellingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterSelling[i].SellerId && w.SellTime == DateTime.Parse(listWaterSelling[i].SellTime));

                if (waterSellingBlockchain != null)
                {
                    listWaterSelling[i].isExistedOnNem = true;
                }
                else
                {
                    listWaterSelling[i].isExistedOnNem = false;
                }
            }

            int totalCount = await waterSellingList
                .CountAsync();

            //var items = await waterSellingList
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listWaterSelling
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterSellingDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterSellingDto>> GetWaterSellingListNotExistOnBlockchain(PaginationInputBase input)
        {
            var waterSellingList = dbWater
                .WaterSellingViewModels
                .FromSql("Pro_GetWaterSellingList");

            var listWaterSelling = mapper.Map<List<WaterSellingDto>>(waterSellingList.ToList());

            List<WaterSellingDto> listWaterNotExistOnBlockchain = new List<WaterSellingDto>();

            for (int i = 0; i < listWaterSelling.Count; i++)
            {
                var waterSellingBlockchain = await dbBlockchain
                                                .WaterSellingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterSelling[i].SellerId && w.SellTime == DateTime.Parse(listWaterSelling[i].SellTime));

                if (waterSellingBlockchain == null)
                {
                    listWaterSelling[i].isExistedOnNem = false;
                    listWaterNotExistOnBlockchain.Add(listWaterSelling[i]);
                }
            }

            int totalCount = listWaterNotExistOnBlockchain.Count;

            var items = listWaterNotExistOnBlockchain
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterSellingDto>
            {
                Items = items,
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

            var listWaterSelling = mapper.Map<List<WaterSellingDto>>(waterSellingList.ToList());

            for (int i = 0; i < listWaterSelling.Count; i++)
            {
                var waterSellingBlockchain = await dbBlockchain
                                                .WaterSellingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterSelling[i].SellerId && w.SellTime == DateTime.Parse(listWaterSelling[i].SellTime));

                if (waterSellingBlockchain != null)
                {
                    listWaterSelling[i].isExistedOnNem = true;
                }
                else
                {
                    listWaterSelling[i].isExistedOnNem = false;
                }
            }

            int totalCount = await waterSellingList
                .CountAsync();

            //var items = await waterSellingList
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listWaterSelling
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterSellingDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }

        public async Task<PaginationSet<WaterSellingDto>> GetWaterSellingListNotExistOnBlockchainByDate(PaginationInputBase input)
        {
            string searchTerm = string.IsNullOrEmpty(input.SearchTerm) ? "" : input.SearchTerm;

            var param = new SqlParameter("@SellTime", searchTerm);

            var waterSellingList = dbWater
                .WaterSellingViewModels
                .FromSql("Pro_GetWaterSellingListByDate @SellTime", param);

            var listWaterSelling = mapper.Map<List<WaterSellingDto>>(waterSellingList.ToList());

            List<WaterSellingDto> listWaterNotExistOnBlockchain = new List<WaterSellingDto>();

            for (int i = 0; i < listWaterSelling.Count; i++)
            {
                var waterSellingBlockchain = await dbBlockchain
                                                .WaterSellingBlockChains
                                                .FirstOrDefaultAsync(w => w.Id == listWaterSelling[i].SellerId && w.SellTime == DateTime.Parse(listWaterSelling[i].SellTime));

                if (waterSellingBlockchain == null)
                {
                    listWaterSelling[i].isExistedOnNem = false;
                    listWaterNotExistOnBlockchain.Add(listWaterSelling[i]);
                }
            }

            int totalCount = listWaterNotExistOnBlockchain.Count;

            var items = listWaterNotExistOnBlockchain
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArray();

            return new PaginationSet<WaterSellingDto>
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }
    }
}
