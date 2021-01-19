using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.Diagnostics;



namespace Basic.Shared
{
    public static class JWT
    {
       
        public static string JsonToken(string token, string mode)
        {
            var handler = new JwtSecurityTokenHandler();
            var jToken = handler.ReadToken(token);
            var tokenS = handler.ReadToken(token) as JwtSecurityToken;
            return  tokenS.Claims.First(claim => claim.Type == mode).Value;
        }
        
    }
}
