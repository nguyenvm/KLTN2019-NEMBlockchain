using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Common
{
    public class ResponseAsObject
    {
        public ResponseAsObject(object data)
        {
            Data = data;
        }

        public object Data { get; set; }
    }
}
