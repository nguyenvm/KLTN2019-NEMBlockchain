using NEMBlockchain.Data.AutoFlowDB_Membership_DataContext;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NEMBlockchain.Service
{
    public interface IMembershipService
    {
        Task<IEnumerable<UserInfo>> GetAllUser(); 
    }
}
