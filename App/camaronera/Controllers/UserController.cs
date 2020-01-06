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
    [Route("api/User")]

    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create([FromBody] WebUser userInfo)
        {
            _context.Add(userInfo);
            //_context.WebUser.Add(userInfo);

            if (await _context.SaveChangesAsync() > 0)
            { return Ok(userInfo); }
            else
            { return BadRequest("Datos incorrectos"); }


        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] WebUser userInfo)
        {
            var result = await _context.WebUser.FirstOrDefaultAsync(x =>
                                x.WebUsu == userInfo.WebUsu && x.WebPass == userInfo.WebPass);

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                //ModelState.AddModelError(string.Empty, "Usuario o contraseña invalido");
                return BadRequest("Datos incorrectos");
            }
        }            
    }
}
