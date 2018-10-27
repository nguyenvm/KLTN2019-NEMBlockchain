using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace NEMBlockchain.Controllers
{
    public class BaseController : Controller
    {
        protected readonly IMapper mapper;
        
        public BaseController(IMapper mapper)
        {
            this.mapper = mapper;
        }
    }
}