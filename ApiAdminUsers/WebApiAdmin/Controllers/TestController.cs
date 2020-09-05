using LibraryDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebApi.Model;

namespace WebApiAdmin.Controllers
{

   
    public class TestController : Controller
    {
        // GET: Test
        public ActionResult Index()
        {
            return View();
        }

        [Route("test")]

        [HttpPost]
        public ActionResult test(int numero)
        {
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(numero);
            return respuestaCliente;
        }

        [Route("addUsers")]
        [HttpPost]
        public ActionResult AddUsers(Users users)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(adminUsers.addUsers(users));
            return respuestaCliente;
        }


        [Route("testget")]

        [HttpGet]
        public ActionResult testGet()
        {
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(1);
            return respuestaCliente;
        }

        [Route("getPost")]
        [HttpPost]        
        public ActionResult getPost([System.Web.Http.FromBody]int user_id)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(adminUsers.getPost(user_id));
            return respuestaCliente; 
        }
    }
}