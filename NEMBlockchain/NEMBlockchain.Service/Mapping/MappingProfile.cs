using AutoMapper;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Membership_DataContext;
using NEMBlockchain.Service.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<AspNetUsers, UserDto>()
            //    .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.UserInfo.FullName))
            //    .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.UserInfo.Address))
            //    .ForMember(dest => dest.Longitude, opt => opt.MapFrom(src => src.UserInfo.Longitude))
            //    .ForMember(dest => dest.Latitude, opt => opt.MapFrom(src => src.UserInfo.Latitude));
            CreateMap<UserBlockChains, UserBlockchainDto>();
        }
    }
}
