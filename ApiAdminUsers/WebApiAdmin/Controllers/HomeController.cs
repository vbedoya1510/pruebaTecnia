using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace WebApiAdmin.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        [Route("getPost")]
        [HttpPost]
        public ActionResult getPost(int user_id)
        {
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(user_id);
            return respuestaCliente;
        }


        [Route("getData")]
        [HttpGet]
        public ActionResult getPost()
        {
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(1);
            return respuestaCliente;
        }
    }
}
