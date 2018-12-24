﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NEMBlockchain.Common;
using NEMBlockchain.Data.AutoFlowDB_Water_Membership_DataContext;
using NEMBlockchain.Service.Common;
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

        public async Task<UserDto> FindUserByInformation(UserDto userDto)
        {
            var user = await (from aspUsers in dbMemberShip.AspNetUsers
                              join userInfo in dbMemberShip.UserInfo on aspUsers.Id equals userInfo.Id
                              where aspUsers.Email == userDto.Email
                                  && aspUsers.UserName == userDto.UserName
                                  && userInfo.Address == userDto.Address
                                  && userInfo.FullName == userDto.FullName
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

            int totalCount = await users
                .CountAsync();

            var items = await users
                .Skip(input.PageSize * input.PageIndex)
                .Take(input.PageSize)
                .ToArrayAsync();

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
