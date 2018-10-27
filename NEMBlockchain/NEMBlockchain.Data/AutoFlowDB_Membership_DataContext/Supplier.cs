using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Membership_DataContext
{
    public partial class Supplier
    {
        public Supplier()
        {
            UserInfo = new HashSet<UserInfo>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Information { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string Address { get; set; }
        public bool? IsActive { get; set; }

        public ICollection<UserInfo> UserInfo { get; set; }
    }
}
