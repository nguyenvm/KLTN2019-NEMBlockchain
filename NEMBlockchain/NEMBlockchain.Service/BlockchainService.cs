using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using AutoMapper;
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace NEMBlockchain.Service
{
    public class BlockchainService : IBlockchainService
    {
        private readonly IMapper mapper;
        public BlockchainService(IMapper mapper)
        {
            this.mapper = mapper;
        }
        public async Task<UserBlockchainDto> InsertUserBlockchain(UserBlockchainDto userBlockchainDto)
        {
            using (var blockchainContext = new AutoFlowDB_BlockchainContext())
            {
                using (var transaction = blockchainContext.Database.BeginTransaction())
                {
                    try
                    {
                        var userBlockChains = await AddUserBlockchain();

                        transaction.Commit();

                        return userBlockChains;
                    }
                    catch (Exception)
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

                async Task<UserBlockchainDto> AddUserBlockchain()
                {
                    var newUserInBlock = (await blockchainContext.UserBlockChains.AddAsync(new UserBlockChains
                    {
                        Id = userBlockchainDto.Id,
                        TransactionHash = userBlockchainDto.TransactionHash
                    })).Entity;

                    await blockchainContext.SaveChangesAsync();

                    return mapper.Map<UserBlockchainDto>(newUserInBlock);
                }
            }
        }

        public async Task<UserBlockchainDto> CheckExistUserBlockchain(string userId)
        {
            using (var blockchainContext = new AutoFlowDB_BlockchainContext())
            {
                var userBlockchain = await blockchainContext.UserBlockChains.FirstOrDefaultAsync(u => u.Id == userId);
                return mapper.Map<UserBlockchainDto>(userBlockchain);
            }
        }
    }
}
