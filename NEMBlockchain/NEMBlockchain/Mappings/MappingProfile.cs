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
            CreateMap<UserContract, UserDto>()
                .ForMember(dest => dest.Longitude, opt => opt.Ignore())
                .ForMember(dest => dest.Latitude, opt => opt.Ignore());
            CreateMap<UserBlockchainContract, UserBlockchainDto>();
            CreateMap<UserBlockchainDto, UserBlockchainContract>();
            CreateMap<WaterBlockchainContract, WaterBlockchainDto>();
            CreateMap<WaterBlockchainDto, WaterBlockchainContract>();
            CreateMap<WaterConsumtionTotalDto, WaterConsumtionTotalContract>();
            CreateMap<WaterConsumptionDetailDto, WaterConsumptionDetailContract>();
            CreateMap<WaterBuyingDto, WaterBuyingContract>();
                //.ForMember(dest => dest.BuyTime, opt => opt.MapFrom(src => src.BuyTime.ToString("yyyy-MM-dd HH:mm:ss.fff")));
            CreateMap<WaterSellingDto, WaterSellingContract>();
                //.ForMember(dest => dest.SellTime, opt => opt.MapFrom(src => src.SellTime.ToString("yyyy-MM-dd HH:mm:ss.fff")));
            CreateMap<WaterBuyingBlockchainContract, WaterBuyingBlockchainDto>();
            CreateMap<WaterBuyingBlockchainDto, WaterBuyingBlockchainContract>()
                .ForMember(dest => dest.BuyTime, opt => opt.MapFrom(src => src.BuyTime.ToString("yyyy-MM-dd HH:mm:ss.fff")));
            CreateMap<WaterSellingBlockchainContract, WaterSellingBlockchainDto>();
            CreateMap<WaterSellingBlockchainDto, WaterSellingBlockchainContract>()
                .ForMember(dest => dest.SellTime, opt => opt.MapFrom(src => src.SellTime.ToString("yyyy-MM-dd HH:mm:ss.fff")));
        }
    }
}
