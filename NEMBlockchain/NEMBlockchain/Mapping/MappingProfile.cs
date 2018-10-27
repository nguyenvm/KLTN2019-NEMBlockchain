using AutoMapper;
using NEMBlockchain.Data.AutoFlowDB_Membership_DataContext;
using NEMBlockchain.Models;

namespace NEMBlockchain.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserInfo, UserInfoViewModel>();
        }
    }
}
