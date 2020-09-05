﻿using LibraryDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebApi.Model;

namespace WApiAdmin.Controllers
{
    public class AdminController : Controller
    {

        [Route("addUser")]
        [HttpPost]
        public ActionResult AddUsers(Users users)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var answer = new ContentResult();
            answer.ContentType = "application/json";
            answer.Content = serializer.Serialize(adminUsers.addUsers(users));
            return answer;

        }

        [HttpPost]
        public ActionResult AutenticateUser(Users users)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var answer = new ContentResult();
            answer.ContentType = "application/json";
            var token = adminUsers.getUsers(users);
            answer.Content = serializer.Serialize(new { token = token });
            return answer;

        }

        [Route("addPost")]
        [HttpPost]
       // [Authorize]
        public ActionResult AddPost(Post post)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var answer = new ContentResult();
            answer.ContentType = "application/json";
            answer.Content = serializer.Serialize(adminUsers.addPost(post));
            return answer;
        }

        [Route("deletePost")]
        [HttpPost]
       // [Authorize]
        public ActionResult deletePost(int post_id)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var answer = new ContentResult();
            answer.ContentType = "application/json";
            answer.Content = serializer.Serialize(adminUsers.deletePost(post_id));
            return answer;
        }

        [Route("getPost")]
        [HttpPost]
        // [Authorize]
        public ActionResult getPost(string user_id)
        {
            int userAux = Int32.Parse(user_id);

            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var answer = new ContentResult();
            answer.ContentType = "application/json";
            answer.Content = serializer.Serialize(adminUsers.getPost(userAux));
            return answer;
        }

    }
}