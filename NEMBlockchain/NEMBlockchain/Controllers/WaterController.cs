using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NEMBlockchain.Common;
using NEMBlockchain.Contract.Water;
using NEMBlockchain.Service;
using NEMBlockchain.Service.Common;

namespace NEMBlockchain.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WaterController : BaseController
    {
        private readonly IWaterService waterService;
        public WaterController(IMapper mapper, IWaterService waterService) : base(mapper)
        {
            this.waterService = waterService;
        }

        [HttpGet("consumptions-list")]
        public async Task<IActionResult> GetConsumtionList([FromQuery]PaginationInputBase input)
        {
            if (string.IsNullOrEmpty(input.SearchTerm) && string.IsNullOrEmpty(input.OrderBy))
            {
                var waterConsumtionDtos = await waterService.GetWaterConsumptionsTotal(input);

                var resultPagination = mapper.Map<PaginationSet<WaterConsumtionTotalContract>>(waterConsumtionDtos);

                return new OkObjectResult(new ResponseAsObject(resultPagination));
            }
            else if (!string.IsNullOrEmpty(input.SearchTerm) && string.IsNullOrEmpty(input.OrderBy))
            {
                var waterConsumtionDtos = await waterService.GetWaterConsumptionsTotalByDate(input);

                var resultPagination = mapper.Map<PaginationSet<WaterConsumtionTotalContract>>(waterConsumtionDtos);

                return new OkObjectResult(new ResponseAsObject(resultPagination));
            }
            else if (!string.IsNullOrEmpty(input.SearchTerm) && input.OrderBy == "Filter")
            {
                var waterConsumtionDtos = await waterService.GetWaterConsumptionsNotExistOnBlockchainTotalByDate(input);

                var resultPagination = mapper.Map<PaginationSet<WaterConsumtionTotalContract>>(waterConsumtionDtos);

                return new OkObjectResult(new ResponseAsObject(resultPagination));
            } else
            {
                var waterConsumtionDtos = await waterService.GetListWaterNotExistOnBlockchain(input);

                var resultPagination = mapper.Map<PaginationSet<WaterConsumtionTotalContract>>(waterConsumtionDtos);

                return new OkObjectResult(new ResponseAsObject(resultPagination));
            }
        }

        [HttpGet("consumption-detail/{userId}/{logTime}")]
        public async Task<IActionResult> GetConsumtionDetail(string userId, string logTime)
        {
            var waterConsumtionDtos = await waterService.GetWaterConsumptionDetail(userId, logTime);

            return new OkObjectResult(new ResponseAsObject(mapper.Map<WaterConsumptionDetailContract[]>(waterConsumtionDtos)));
        }

        [HttpGet("buying")]
        public async Task<IActionResult> GetWaterBuyingList([FromQuery]PaginationInputBase input)
        {
            if (string.IsNullOrEmpty(input.SearchTerm))
            {
                var waterBuyingDtos = await waterService.GetWaterBuyingList(input);

                return new OkObjectResult(new ResponseAsObject(mapper.Map<PaginationSet<WaterBuyingContract>>(waterBuyingDtos)));
            }
            else
            {
                var waterBuyingDtos = await waterService.GetWaterBuyingListByDate(input);

                return new OkObjectResult(new ResponseAsObject(mapper.Map<PaginationSet<WaterBuyingContract>>(waterBuyingDtos)));
            }

        }

        [HttpGet("selling")]
        public async Task<IActionResult> GetWaterSellingList([FromQuery]PaginationInputBase input)
        {
            if (string.IsNullOrEmpty(input.SearchTerm))
            {
                var waterSellingDtos = await waterService.GetWaterSellingList(input);

                return new OkObjectResult(new ResponseAsObject(mapper.Map<PaginationSet<WaterSellingContract>>(waterSellingDtos)));
            }
            else
            {
                var waterSellingDtos = await waterService.GetWaterSellingListByDate(input);

                return new OkObjectResult(new ResponseAsObject(mapper.Map<PaginationSet<WaterSellingContract>>(waterSellingDtos)));
            }

        }
    }
}