using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NEMBlockchain.Service;
using NEMBlockchain.Common;
using NEMBlockchain.Models;
using NEMBlockchain.Service.Dtos;

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
        public async Task<IActionResult> AddUserBlockchain([FromBody]UserBlockchainViewModel userBlockchainViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (string.IsNullOrEmpty(userBlockchainViewModel.TransactionHash))
            {
                return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.TRANSACTION_HASH_IS_REQUIRED, true));
            }
            await blockchainService.InsertUserBlockchain(mapper.Map<UserBlockchainDto>(userBlockchainViewModel));
            return new OkObjectResult(new ResponseAsMessage(MessageCode.INSERT_TRANSACTION_HASH_SUCCESSUL));
        }
    }
}