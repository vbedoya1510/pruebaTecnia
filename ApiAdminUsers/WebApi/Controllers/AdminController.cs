using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using LibraryDB;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Model;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.HttpOverrides;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        [Route("addUser")]
        [HttpPost]
        public ActionResult AddUsers(Users users)
        {
            AdminUsers adminUsers = new AdminUsers();

            return Ok(adminUsers.addUsers(users));

        }


        [Route("autenticate")]
        [EnableCors(origins:"*", headers: "*", methods: "*")]
        [HttpPost]
        public ActionResult AutenticateUser(Users users)
        {
            AdminUsers adminUsers = new AdminUsers();

            var token = adminUsers.getUsers(users);
            return Ok(new { token = token });

        }

        [Route("test")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpPost]
        public ActionResult test(int numero)
        {
            AdminUsers adminUsers = new AdminUsers();            
            return Ok(new { token = numero });
        }

        [Route("testGet")]
        [EnableCors(origins:"*", headers: "*", methods: "*")]
        [HttpGet]
        public ActionResult testGet()
        {
            AdminUsers adminUsers = new AdminUsers();
            return Ok(new { token = 1 });
        }

        [Route("addPost")]
        [HttpPost]
        [Authorize]
        public ActionResult AddPost(Post post)
        {
            AdminUsers adminUsers = new AdminUsers();

            return Ok(adminUsers.addPost(post));
        }

        [Route("deletePost")]
        [HttpPost]
        [Authorize]
        public ActionResult deletePost(int post_id)
        {
            AdminUsers adminUsers = new AdminUsers();

            return Ok(adminUsers.deletePost(post_id));
        }

        [Route("getPost")]
        [HttpPost]
        [Authorize]
        public ActionResult getPost(int user_id)
        {
            AdminUsers adminUsers = new AdminUsers();

            return Ok(adminUsers.getPost(user_id));
        }


        [Route("getUsers")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]     
        public IActionResult GetUsers()
        {
            AdminUsers adminUsers = new AdminUsers();
            
            return Ok(adminUsers.getUsersAll());

        }

    }
}