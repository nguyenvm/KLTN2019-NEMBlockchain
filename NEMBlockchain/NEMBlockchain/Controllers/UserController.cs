using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NEMBlockchain.Common;
using NEMBlockchain.Data.AutoFlowDB_Membership_DataContext;
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
        public async Task<IActionResult> GetAllUser()
        {
            var listUser = await membershipService.GetAllUser();
            return new OkObjectResult(new ResponseAsObject(mapper.Map<IEnumerable<UserInfoViewModel>>(listUser)));
        }
    }
}