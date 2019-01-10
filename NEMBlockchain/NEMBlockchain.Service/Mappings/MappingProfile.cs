using AutoMapper;
using NEMBlockchain.Data.AutoFlowDB_Blockchain_DataContext;
using NEMBlockchain.Data.AutoFlowDB_Water_Water_DataContext.ViewModels;
using NEMBlockchain.Service.Dtos;

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
            CreateMap<WaterBlockChains, WaterBlockchainDto>();
            CreateMap<WaterConsumtionTotalViewModel, WaterConsumtionTotalDto>()
                .ForMember(dest => dest.isExistedOnNem, opt => opt.Ignore());
            CreateMap<WaterConsumptionDetailViewModel, WaterConsumptionDetailDto>();
            CreateMap<WaterBuyingViewModel, WaterBuyingDto>()
                .ForMember(dest => dest.BuyTime, opt => opt.MapFrom(src => src.BuyTime.ToString("yyyy-MM-dd HH:mm:ss.fff")))
                .ForMember(dest => dest.isExistedOnNem, opt => opt.Ignore());
            CreateMap<WaterSellingViewModel, WaterSellingDto>()
                .ForMember(dest => dest.SellTime, opt => opt.MapFrom(src => src.SellTime.ToString("yyyy-MM-dd HH:mm:ss.fff")))
                .ForMember(dest => dest.isExistedOnNem, opt => opt.Ignore());
            CreateMap<WaterBuyingBlockChains, WaterBuyingBlockchainDto>();
            CreateMap<WaterSellingBlockChains, WaterSellingBlockchainDto>();
        }
    }
}
