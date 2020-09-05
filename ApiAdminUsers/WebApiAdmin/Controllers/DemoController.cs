using LibraryDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WebApi.Model;
using HttpPostAttribute = System.Web.Http.HttpPostAttribute;

namespace WebApiAdmin.Controllers
{

    public class DemoController : ApiController
    {
        // GET: api/Demo
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        public ActionResult AddUsers(Users users)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(adminUsers.addUsers(users));
            return respuestaCliente;
          }

        public ActionResult getNumber(int numero)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(numero);
            return respuestaCliente;
        }


        // GET: api/Demo/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Demo
        public ActionResult Post([FromBody]int user_id)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(adminUsers.getPost(user_id));
            return respuestaCliente;
        }

        // PUT: api/Demo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Demo/5
        public void Delete(int id)
        {
            AdminUsers adminUsers = new AdminUsers();
            var serializer = new JavaScriptSerializer();
            var respuestaCliente = new ContentResult();
            respuestaCliente.ContentType = "application/json";
            respuestaCliente.Content = serializer.Serialize(adminUsers.getPost(id));
            
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        public ActionResult getPost(int user_id)
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
