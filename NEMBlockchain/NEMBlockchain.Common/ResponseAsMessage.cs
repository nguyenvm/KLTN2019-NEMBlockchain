using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Common
{
    public class ResponseAsMessage
    {
        public ResponseAsMessage(string message, bool error = false)
        {
            Message = message;
            Error = error;
        }

        public string Message { get; set; }
        public bool Error { get; set; }
    }
}
