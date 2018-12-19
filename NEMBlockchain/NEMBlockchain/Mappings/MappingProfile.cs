using AutoMapper;
using NEMBlockchain.Contract.Blockchain;
using NEMBlockchain.Contract.Membership;
using NEMBlockchain.Contract.Water;
using NEMBlockchain.Service.Dtos;

namespace NEMBlockchain.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserDto, UserContract>();
            CreateMap<UserBlockchainContract, UserBlockchainDto>();
            CreateMap<UserBlockchainDto, UserBlockchainContract>();
            CreateMap<WaterBlockchainContract, WaterBlockchainDto>();
            CreateMap<WaterBlockchainDto, WaterBlockchainContract>();
            CreateMap<WaterConsumtionTotalDto, WaterConsumtionTotalContract>();
            CreateMap<WaterConsumptionDetailDto, WaterConsumptionDetailContract>();
        }
    }
}
