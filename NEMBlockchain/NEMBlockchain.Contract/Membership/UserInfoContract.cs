using System;

namespace NEMBlockchain.Contract.Membership
{
    public class UserInfoContract
    {
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
    }
}
