using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NEMBlockchain.Common;
using NEMBlockchain.Data.AutoFlowDB_Membership_DataContext;
using NEMBlockchain.Service.Dtos;

namespace NEMBlockchain.Service
{
    public class MembershipService : IMembershipService
    {
        private readonly IMapper mapper;
        public MembershipService(IMapper mapper)
        {
            this.mapper = mapper;
        }
        public async Task<UserDto[]> GetAllUsers()
        {
            using (AutoFlowDB_MembershipContext dbMemberShip = new AutoFlowDB_MembershipContext())
            {
                var listUser = await (from aspUsers in dbMemberShip.AspNetUsers
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
                if (listUser == null)
                {
                    throw new MyException(ErrorCode.NOT_FOUND_ANY_USER);
                }
                return mapper.Map<UserDto[]>(listUser);
            }
        }
    }
}
