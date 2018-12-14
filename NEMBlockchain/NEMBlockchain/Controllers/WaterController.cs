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

        public int WaterConsumtionViewModel { get; private set; }

        [HttpGet("consumtions-list")]
        public async Task<IActionResult> GetConsumtionList([FromQuery]PaginationInputBase input)
        {
            var waterConsumtions = await waterService.GetWaterConsumptionsTotalByDate(input);

            var resultPagination = mapper.Map<PaginationSet<WaterConsumtionTotalContract>>(waterConsumtions);

            return new OkObjectResult(new ResponseAsObject(resultPagination));
        }

        [HttpGet("consumption-detail/{userId}/{logTime}")]
        public async Task<IActionResult> GetConsumtionDetail(string userId, string logTime)
        {
            var waterConsumtion = await waterService.GetWaterConsumptionDetail(userId, logTime);

            return new OkObjectResult(new ResponseAsObject(waterConsumtion));
        }
     }
}