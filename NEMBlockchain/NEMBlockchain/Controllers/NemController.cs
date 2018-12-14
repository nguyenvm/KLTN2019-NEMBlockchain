using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NEMBlockchain.Service;
using NEMBlockchain.Common;
using NEMBlockchain.Service.Dtos;
using NEMBlockchain.Contract.Blockchain;

namespace NEMBlockchain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NemController : BaseController
    {
        private readonly IBlockchainService blockchainService;
        public NemController(IMapper mapper, IBlockchainService blockchainService) : base(mapper)
        {
            this.blockchainService = blockchainService;
        }

        [HttpPost("user-transaction")]
        public async Task<IActionResult> AddUserBlockchain([FromBody]UserBlockchainContract userBlockchainContract)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (string.IsNullOrEmpty(userBlockchainContract.TransactionHash))
                {
                    return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.TRANSACTION_HASH_IS_REQUIRED, true));
                }

                await blockchainService.InsertUserBlockchain(mapper.Map<UserBlockchainDto>(userBlockchainContract));

                return new OkObjectResult(new ResponseAsMessage(MessageCode.INSERT_TRANSACTION_HASH_SUCCESSUL));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("check-exist-user/{userId}")]
        public async Task<IActionResult> CheckExistUser(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.USERID_IS_REQUIRED, true));
            }

            var userBlockchainDto = await blockchainService.CheckExistUserBlockchain(userId);

            return new OkObjectResult(new ResponseAsObject(mapper.Map<UserBlockchainContract>(userBlockchainDto)));
        }
    }
}