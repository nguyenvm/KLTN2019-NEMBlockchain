using NEMBlockchain.Service.Common;
using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IMembershipService
    {
        Task<PaginationSet<UserDto>> GetAllUsers(PaginationInputBase input);
        Task<UserDto> FindUserByInformation(UserDto userDto);
    }
}
