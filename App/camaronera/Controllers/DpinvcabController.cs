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
    [Route("api/DPINVCAB")]
    public class DpinvcabController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DpinvcabController(AppDbContext context)
        { this._context = context; }

        [Route("CreateInvCab")]
        [HttpPost]
        public async Task<IActionResult> CreateInvCab([FromBody] Dpinvcab model)
        {
            if (ModelState.IsValid)
            {
                _context.Dpinvcab.Add(model);
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