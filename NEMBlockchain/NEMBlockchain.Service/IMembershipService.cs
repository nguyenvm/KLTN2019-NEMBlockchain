using NEMBlockchain.Service.Dtos;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IMembershipService
    {
        Task<UserDto[]> GetAllUsers();
    }
}
