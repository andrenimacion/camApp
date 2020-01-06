using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace camaronera.Models.Tablas
{
    public class Sp_Numsecu
    {
        [Required]
        public string Tipo { get; set; }
        [Required]
        public string Modulo { get; set; }
        public string Numero { get; set; }
        public Boolean DevHVA { get; set; }
        public DateTime? Fecha { get; set; }
    }
}
