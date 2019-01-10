using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NEMBlockchain.Common;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Water_Membership_DataContext;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Service.Dtos;

namespace NEMBlockchain.Service
{
    public class MembershipService : IMembershipService
    {
        private readonly IMapper mapper;
        private readonly AutoFlowDB_Water_MembershipContext dbMemberShip;
        private readonly AutoFlowDB_BlockchainContext dbBlockchain;
        public MembershipService(IMapper mapper, AutoFlowDB_Water_MembershipContext dbMemberShip, AutoFlowDB_BlockchainContext dbBlockchain)
        {
            this.dbMemberShip = dbMemberShip;
            this.dbBlockchain = dbBlockchain;
            this.mapper = mapper;
        }

        public async Task<UserDto> FindUserByInformation(UserDto userDto)
        {
            var user = await (from aspUsers in dbMemberShip.AspNetUsers
                              join userInfo in dbMemberShip.UserInfo on aspUsers.Id equals userInfo.Id
                              where aspUsers.Email == userDto.Email
                                  || aspUsers.UserName == userDto.UserName
                              select new UserDto
                              {
                                  Id = aspUsers.Id,
                                  FullName = aspUsers.UserInfo.FullName,
                                  UserName = aspUsers.UserName,
                                  Email = aspUsers.Email,
                                  Address = aspUsers.UserInfo.Address,
                                  Longitude = aspUsers.UserInfo.Longitude,
                                  Latitude = aspUsers.UserInfo.Latitude
                              }).FirstOrDefaultAsync();

            return user;
        }

        public async Task<PaginationSet<UserDto>> GetAllUsers(PaginationInputBase input)
        {
            var users = from aspUsers in dbMemberShip.AspNetUsers
                        join userInfo in dbMemberShip.UserInfo on aspUsers.Id equals userInfo.Id
                        select new UserDto
                        {
                            Id = aspUsers.Id,
                            FullName = aspUsers.UserInfo.FullName,
                            UserName = aspUsers.UserName,
                            Email = aspUsers.Email,
                            Address = aspUsers.UserInfo.Address,
                            Longitude = aspUsers.UserInfo.Longitude,
                            Latitude = aspUsers.UserInfo.Latitude
                        };

            var listUser = users.ToList();
            for (int i = 0; i < listUser.Count; i++)
            {
                var userBlockchain = await dbBlockchain
                                   .UserBlockChains
                                   .FirstOrDefaultAsync(u => u.Id == listUser[i].Id);

                if (userBlockchain != null)
                {
                    listUser[i].isExistedOnNem = true;
                }
                else
                {
                    listUser[i].isExistedOnNem = false;
                }
            }


            int totalCount = await users
                .CountAsync();

            //var items = await users
            //    .Skip(input.PageSize * input.PageIndex)
            //    .Take(input.PageSize)
            //    .ToArrayAsync();

            var items = listUser
               .Skip(input.PageSize * input.PageIndex)
               .Take(input.PageSize)
               .ToArray();

            return new PaginationSet<UserDto>()
            {
                Items = items,
                PageIndex = input.PageIndex,
                PageSize = input.PageSize,
                TotalCount = totalCount
            };
        }
    }
}
