using AutoMapper;
using NEMBlockchain.Models;
using NEMBlockchain.Service.Dtos;

namespace NEMBlockchain.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDto, UserViewModel>();
            CreateMap<UserBlockchainViewModel, UserBlockchainDto>();
            CreateMap<UserBlockchainDto, UserBlockchainViewModel>();
        }
    }
}
