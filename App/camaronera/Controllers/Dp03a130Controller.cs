using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using camaronera.Models;
using camaronera.Models.Tablas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace camaronera.Controllers
{
    [Produces("application/json")]
    [Route("api/Dp03a130")]
    public class Dp03a130Controller : ControllerBase
    {
        private readonly AppDbContext _context;

        public Dp03a130Controller(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        [Route("GetPiscinas/{codCam}")]
        public IEnumerable<Dp03a130> GetPiscinas([FromRoute] string codCam)
        {
            return _context.Dp03a130.Where(x => x.Camaronera== codCam);
        }
    }
}