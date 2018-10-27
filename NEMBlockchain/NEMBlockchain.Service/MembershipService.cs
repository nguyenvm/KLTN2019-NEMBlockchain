using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NEMBlockchain.Data.AutoFlowDB_Membership_DataContext;

namespace NEMBlockchain.Service
{
    public class MembershipService : IMembershipService
    {
        public async Task<IEnumerable<UserInfo>> GetAllUser()
        {
            using (AutoFlowDB_MembershipContext db = new AutoFlowDB_MembershipContext())
            {
                var listUser = await db.UserInfo.Select(t => t).ToListAsync();
                return listUser;
            }
        }
    }
}
