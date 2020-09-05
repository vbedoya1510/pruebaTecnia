using LibraryDB;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.General
{
    public class Security
    {
        public static string getEncrypt(string str)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++)
            {
                sb.AppendFormat("{0:x2}", stream[i]);
            }
            return sb.ToString();
        }

        public static string BuildToken(Users users)
        {
            var claims = new[]
            {
                new Claim("user", users.user),
                new Claim("users_id", users.users_id.ToString()),
                new Claim("email", users.email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["KeyToken"].ToString()));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddHours(1);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: ConfigurationManager.AppSettings["ValidIssuer"].ToString(),
                audience: ConfigurationManager.AppSettings["ValidAudience"].ToString(),
                claims: claims,
                expires: expiration,
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
           
        }


    }
}
