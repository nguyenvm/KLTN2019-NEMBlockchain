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

        [HttpPost("water-transaction")]
        public async Task<IActionResult> AddWaterBlockchain([FromBody]WaterBlockchainContract waterBlockchainContract)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (string.IsNullOrEmpty(waterBlockchainContract.TransactionHash))
                {
                    return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.TRANSACTION_HASH_IS_REQUIRED, true));
                }

                await blockchainService.InsertWaterBlockchain(mapper.Map<WaterBlockchainDto>(waterBlockchainContract));

                return new OkObjectResult(new ResponseAsMessage(MessageCode.INSERT_TRANSACTION_HASH_SUCCESSUL));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("check-exist-water/{id}/{logTime}")]
        public async Task<IActionResult> CheckExistWater(string id, DateTime logTime)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.USERID_IS_REQUIRED, true));
            }

            var waterBlockchainDto = await blockchainService.CheckExistWaterBlockchain(id, logTime);

            return new OkObjectResult(new ResponseAsObject(mapper.Map<WaterBlockchainContract>(waterBlockchainDto)));
        }

        [HttpPost("water-buying-transaction")]
        public async Task<IActionResult> AddWaterBuyingBlockchain([FromBody]WaterBuyingBlockchainContract waterBuyingBlockchainContract)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (string.IsNullOrEmpty(waterBuyingBlockchainContract.TransactionHash))
                {
                    return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.TRANSACTION_HASH_IS_REQUIRED, true));
                }

                await blockchainService.InsertWaterBuyingBlockchain(mapper.Map<WaterBuyingBlockchainDto>(waterBuyingBlockchainContract));

                return new OkObjectResult(new ResponseAsMessage(MessageCode.INSERT_TRANSACTION_HASH_SUCCESSUL));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("check-exist-water-buying/{id}/{buyTime}")]
        public async Task<IActionResult> CheckExistWaterBuying(string id, DateTime buyTime)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.USERID_IS_REQUIRED, true));
            }

            var waterBuyingBlockchainDto = await blockchainService.CheckExistWaterBuyingBlockchain(id, buyTime);

            return new OkObjectResult(new ResponseAsObject(mapper.Map<WaterBuyingBlockchainContract>(waterBuyingBlockchainDto)));
        }

        [HttpPost("water-selling-transaction")]
        public async Task<IActionResult> AddWaterSellingBlockchain([FromBody]WaterSellingBlockchainContract waterSellingBlockchainContract)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (string.IsNullOrEmpty(waterSellingBlockchainContract.TransactionHash))
                {
                    return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.TRANSACTION_HASH_IS_REQUIRED, true));
                }

                await blockchainService.InsertWaterSellingBlockchain(mapper.Map<WaterSellingBlockchainDto>(waterSellingBlockchainContract));

                return new OkObjectResult(new ResponseAsMessage(MessageCode.INSERT_TRANSACTION_HASH_SUCCESSUL));
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("check-exist-water-selling/{id}/{sellTime}")]
        public async Task<IActionResult> CheckExistWaterSelling(string id, DateTime sellTime)
        {
            if (string.IsNullOrEmpty(id))
            {
                return new BadRequestObjectResult(new ResponseAsMessage(ErrorCode.USERID_IS_REQUIRED, true));
            }

            var waterSellingBlockchainDto = await blockchainService.CheckExistWaterSellingBlockchain(id, sellTime);

            return new OkObjectResult(new ResponseAsObject(mapper.Map<WaterSellingBlockchainContract>(waterSellingBlockchainDto)));
        }
    }
}