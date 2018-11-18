using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Service.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }

    }
}
