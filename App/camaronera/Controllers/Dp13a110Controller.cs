using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using camaronera.Models;
using camaronera.Models.Tablas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace camaronera.Controllers
{
    [Produces("application/json")]
    [Route("api/Dp13a110")]
    public class Dp13a110Controller : ControllerBase
    {
        private readonly AppDbContext _context;

        public Dp13a110Controller(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        [Route("GetCamaroneras")]
        public IEnumerable<Dp13a110> GetCamaroneras()
        {
            return _context.Dp13a110.OrderBy(x => x.Cod_cam);
        }
    }
}