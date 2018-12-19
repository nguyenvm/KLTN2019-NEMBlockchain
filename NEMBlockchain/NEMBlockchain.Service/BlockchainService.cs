using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using AutoMapper;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NEMBlockchain.Common;

namespace NEMBlockchain.Service
{
    public class BlockchainService : IBlockchainService
    {
        private readonly AutoFlowDB_BlockchainContext dbBlockchain;
        private readonly IMapper mapper;
        public BlockchainService(IMapper mapper, AutoFlowDB_BlockchainContext dbBlockchain)
        {
            this.dbBlockchain = dbBlockchain;
            this.mapper = mapper;
        }
        public async Task<UserBlockchainDto> InsertUserBlockchain(UserBlockchainDto userBlockchainDto)
        {
            using (var transaction = dbBlockchain.Database.BeginTransaction())
            {
                try
                {
                    var userBlockChains = await AddUserBlockchain();

                    await dbBlockchain.SaveChangesAsync();

                    transaction.Commit();

                    return mapper.Map<UserBlockchainDto>(userBlockChains);
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            async Task<UserBlockChains> AddUserBlockchain()
            {
                var newUserInBlock = (await dbBlockchain.UserBlockChains.AddAsync(new UserBlockChains
                {
                    Id = userBlockchainDto.Id,
                    TransactionHash = userBlockchainDto.TransactionHash
                })).Entity;

                return newUserInBlock;
            }
        }

        public async Task<UserBlockchainDto> CheckExistUserBlockchain(string userId)
        {
            var userBlockchain = await dbBlockchain
                .UserBlockChains
                .FirstOrDefaultAsync(u => u.Id == userId);

            return mapper.Map<UserBlockchainDto>(userBlockchain);
        }
        public async Task<WaterBlockchainDto> InsertWaterBlockchain(WaterBlockchainDto waterBlockchainDto)
        {
            using (var transaction = dbBlockchain.Database.BeginTransaction())
            {
                try
                {
                    var waterBlockChains = await AddWaterBlockchain();

                    await dbBlockchain.SaveChangesAsync();

                    transaction.Commit();

                    return mapper.Map<WaterBlockchainDto>(waterBlockChains);
                }
                catch (Exception e)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            async Task<WaterBlockChains> AddWaterBlockchain()
            {
                var newWaterInBlock = (await dbBlockchain.WaterBlockChains.AddAsync(new WaterBlockChains
                {
                    Id = waterBlockchainDto.Id,
                    LogTime = waterBlockchainDto.LogTime,
                    TransactionHash = waterBlockchainDto.TransactionHash
                })).Entity;

                return newWaterInBlock;
            }
        }
        public async Task<WaterBlockchainDto> CheckExistWaterBlockchain(string id)
        {
            var waterBlockchain = await dbBlockchain
                .WaterBlockChains
                .FirstOrDefaultAsync(w => w.Id == id);

            return mapper.Map<WaterBlockchainDto>(waterBlockchain);
        }
    }
}
