using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NEMBlockchain.Common;
using NEMBlockchain.Data.AutoFlowDB_Water_Membership_DataContext;
using NEMBlockchain.Service.Dtos;

namespace NEMBlockchain.Service
{
    public class MembershipService : IMembershipService
    {
        private readonly IMapper mapper;
        private readonly AutoFlowDB_Water_MembershipContext dbMemberShip;
        public MembershipService(IMapper mapper, AutoFlowDB_Water_MembershipContext dbMemberShip)
        {
            this.dbMemberShip = dbMemberShip;
            this.mapper = mapper;
        }
        public async Task<UserDto[]> GetAllUsers()
        {
            var listUsers = await (from aspUsers in dbMemberShip.AspNetUsers
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
                                  }).ToArrayAsync();

            return listUsers;
        }
    }
}
