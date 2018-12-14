using System;
using System.Collections.Generic;
using System.Text;

namespace NEMBlockchain.Common
{
    public static class ErrorCode
    {
        public const string TRANSACTION_HASH_IS_REQUIRED = "TRANSACTION_HASH_IS_REQUIRED";
        public const string USER_BLOCK_CHAIN_NOT_EXIST = "USER_BLOCK_CHAIN_NOT_EXIST";
        public const string USERID_IS_REQUIRED = "USERID_IS_REQUIRED";
        public const string USERID_AND_LOGTIME_IS_REQUIRED = "USERID_AND_LOGTIME_IS_REQUIRED";
    }
}
