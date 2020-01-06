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
    [Route("api/DP03AMOV")]
    public class Dp03amovController : ControllerBase
    {
        private readonly AppDbContext _context;

        public Dp03amovController(AppDbContext context)
        { this._context = context; }

        [Route("CreateInvDet")]
        [HttpPost]
        public async Task<IActionResult> CreateInvDet([FromBody] Dp03amov model)
        {
            if (ModelState.IsValid)
            {
                _context.Dp03amov.Add(model);
                if (await _context.SaveChangesAsync() > 0)
                {
                    return Ok(model);
                }
                else
                { return BadRequest("Datos incorrectos"); }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
    }
}