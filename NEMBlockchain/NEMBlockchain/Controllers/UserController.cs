using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NEMBlockchain.Common;
using NEMBlockchain.Contract.Membership;
using NEMBlockchain.Service;
using NEMBlockchain.Service.Common;
using NEMBlockchain.Service.Dtos;

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
        public async Task<IActionResult> GetAllUsers([FromQuery]PaginationInputBase input)
        {
            var userDtos = await membershipService.GetAllUsers(input);

            var resultPagination = mapper.Map<PaginationSet<UserContract>>(userDtos);

            return new OkObjectResult(new ResponseAsObject(resultPagination));
        }

        [HttpPost("find")]
        public async Task<IActionResult> FindUserByInformation([FromBody]UserContract userContract)
        {
            var userDto = await membershipService.FindUserByInformation(mapper.Map<UserDto>(userContract));

            return new OkObjectResult(new ResponseAsObject(mapper.Map<UserContract>(userDto)));
        }
    }
}