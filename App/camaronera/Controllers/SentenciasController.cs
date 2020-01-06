using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
    [Route("api/sentencias")]
    public class SentenciasController : ControllerBase
    {
        private readonly AppDbContext _context;
        public SentenciasController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpPost]
        [Route("secuencia")]
        public ActionResult<string> SecuenciaCnt([FromBody] Sp_Numsecu p)
        {
            string secu;
            string Sentencia = "exec sp_Numsecu @tipo,@modulo,@numero,@hdv,@fecha ";
         
            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Sentencia, connection))
                {
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.SelectCommand.CommandType = CommandType.Text;

                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@tipo", p.Tipo));
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@modulo", p.Modulo));
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@numero", p.Numero));
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@hdv", p.DevHVA));
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@fecha", p.Fecha));

                    adapter.Fill(dt);
                }
            }

            if (dt == null)
            { return NotFound(""); }
            else
            {
                secu = dt.Rows[0][0].ToString();
            }
            return Ok(secu);
        }

        [HttpGet]
        [Route("getTalla/{cantidad}/{pesoT}")]
        public ActionResult<string> GetTalla([FromRoute] int cantidad, [FromRoute] Double pesoT)
        {
            string Talla;
            string Sentencia = "select codigo,nombre from ALPTABLA where master=(select codigo from alptabla where nomtag='I_TALLA') and campo1 = 'ENTERO' and valor = @valor";
            double Total = pesoT / cantidad;

            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Sentencia, connection))
                {
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.SelectCommand.CommandType = CommandType.Text;
                   
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@valor", Total));                    
                    adapter.Fill(dt);
                }
            }

            if (dt == null)
            { return NotFound(""); }
            else
            {
                Talla = dt.Rows[0][0].ToString();
            }
            return Ok(Talla);
        }

        [HttpGet]
        [Route("getPrint/{tipo}/{numero}")]
        public ActionResult<DataTable> GetPrint([FromRoute] string tipo, [FromRoute] string numero)
        {            
            string Sentencia = "select a.tipo,a.numero,a.linea,a.fecha_tra,a.no_parte,isnull(c.nombre,'')nItem,a.camaron,"+
                                "a.lbrastotal,a.bodega piscina, isnull(e.nombre, '') npiscina,round((a.lbrastotal / a.camaron), 2) pesoprom,b.camaronera,"+
                                "isnull(d.nombre, '') ncamaronera,b.corrida,a.talla "+
                                "from dp03amov a "+
                                "left join dpinvcab b on a.tipo = b.tipo and a.numero = b.numero " +
                                "left join dp03a110 c on a.no_parte = c.no_parte " +
                                "left join dp13a110 d on b.camaronera = d.cod_cam " +
                                "left join dp03a130 e on a.bodega = e.codigo " +
                                "where a.tipo = @tipo and a.numero = @numero";
            
            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Sentencia, connection))
                {
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.SelectCommand.CommandType = CommandType.Text;

                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@tipo", tipo));
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@numero", numero));
                    adapter.Fill(dt);
                }
            }

            if (dt == null)
            { return NotFound(""); }
           
            return Ok(dt);
        }

        [HttpGet]
        [Route("GetHist/{fecha1}/{fecha2}")]
        public ActionResult<DataTable> GetHist([FromRoute] DateTime fecha1, [FromRoute] DateTime fecha2)
        {
            string Sentencia = "select a.tipo,a.numero,b.fecha_tra,b.camaronera,b.corrida,sum(a.camaron) totCamaron, sum(a.lbrastotal) lbrastotal " +
                                "from dp03amov a left join DPINVCAB b on a.tipo = b.tipo and a.numero = b.numero where b.fecha_tra between @fecha1 and @fecha2 and b.grupo = 'M' " +
                                "group by a.tipo,a.numero,b.fecha_tra,b.camaronera,b.corrida order by b.fecha_tra ";
                                

            DataTable dt = new DataTable();
            using (SqlConnection connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(Sentencia, connection))
                {
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.SelectCommand.CommandType = CommandType.Text;

                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@fecha1", fecha1));
                    adapter.SelectCommand.Parameters.Add(new SqlParameter("@fecha2", fecha2));
                    adapter.Fill(dt);
                }
            }

            if (dt == null)
            { return NotFound(""); }

            return Ok(dt);
        }

    }
}