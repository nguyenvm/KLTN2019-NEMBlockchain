using System;
using System.Collections.Generic;

namespace NEMBlockchain.Data.AutoFlowDB_Membership_DataContext
{
    public partial class UserInfo
    {
        public UserInfo()
        {
            Report = new HashSet<Report>();
        }

        public string Id { get; set; }
        public string FullName { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public byte? Gender { get; set; }
        public int? WaterSupplierId { get; set; }
        public DateTime? CreateDate { get; set; }
        public byte? PendingStatus { get; set; }
        public double? Coin { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public bool? IsActive { get; set; }
        public int? AccountType { get; set; }
        public string SerialNumber { get; set; }

        public AspNetUsers IdNavigation { get; set; }
        public Supplier WaterSupplier { get; set; }
        public ICollection<Report> Report { get; set; }
    }
}
