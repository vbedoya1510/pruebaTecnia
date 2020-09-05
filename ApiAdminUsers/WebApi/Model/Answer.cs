using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class Answer
    {
        public string errors { get; set; }

        public object result { get; set; }

        public bool successful { get; set; }
    }
}
