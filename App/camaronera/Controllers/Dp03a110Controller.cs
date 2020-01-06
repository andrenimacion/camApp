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
    [Route("api/Dp03a110")]
    public class Dp03a110Controller : ControllerBase
    {
        private readonly AppDbContext _context;

        public Dp03a110Controller(AppDbContext context)
        {
            this._context = context;
        }

        [HttpGet]
        [Route("GetProductos")]
        public IEnumerable<Dp03a110> GetProductos()
        {
            return _context.Dp03a110;
        }

        [HttpGet]
        [Route("GetProductoByCodigo/{codigo}")]
        public async Task<ActionResult<Dp03a110>> GetProductoByCodigo([FromRoute] string codigo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Dp03a110 producto = await _context.Dp03a110.Where(m => m.No_parte == codigo).FirstOrDefaultAsync();

            if (producto == null)
            {
                return NotFound();
            }

            return Ok(producto);
        }

        [HttpGet]
        [Route("GetProductoByNombre/{nombre}")]
        public async Task<ActionResult<List<Dp03a110>>> GetProductoByNombre([FromRoute] string nombre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            List<Dp03a110> producto = await _context.Dp03a110
                                        .Where(s => EF.Functions.Like(s.Nombre, "%" + nombre + "%"))
                                        .Take(20).ToListAsync();

            if (producto == null)
            {
                return NotFound();
            }

            return Ok(producto);
        }

        [HttpPost]
        [Route("SaveItem")]
        public async Task<IActionResult> SaveItem([FromBody] Dp03a110 model)
        {
            if (ModelState.IsValid)
            {
                _context.Dp03a110.Add(model);
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

        [HttpGet]
        [Route("CheckNoparte/{codigo}")]
        public bool CheckNoparte([FromRoute] string codigo)
        {
            if (!ModelState.IsValid)
            { return false; }

            Dp03a110 producto = _context.Dp03a110.Where(m => m.No_parte == codigo).FirstOrDefault();

            if (producto == null)
            { return false; }

            return true;
        }
    }
}