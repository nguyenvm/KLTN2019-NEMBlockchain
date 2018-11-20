using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NEMBlockchain.Common;
using NEMBlockchain.Models;
using NEMBlockchain.Service;

namespace NEMBlockchain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IMembershipService membershipService;
        public UserController(IMapper mapper, IMembershipService membershipService) : base(mapper)
        {
            this.membershipService = membershipService;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAllUsers()
        {
            var userDtos = await membershipService.GetAllUsers();

            return new OkObjectResult(new ResponseAsObject(mapper.Map<UserViewModel[]>(userDtos)));
        }
    }
}