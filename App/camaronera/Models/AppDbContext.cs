using camaronera.Models.Tablas;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace camaronera.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }

        public DbSet<WebUser> WebUser { get; set; }
        public DbSet<Dp13a110> Dp13a110 { get; set; }
        public DbSet<Dp03a110> Dp03a110 { get; set; }
        public DbSet<Dp03a130> Dp03a130 { get; set; }
        public DbSet<Dpinvcab> Dpinvcab { get; set; }
        public DbSet<Dp03amov> Dp03amov { get; set; }



        //internal Task FirstOrDefaultAsync(Func<object, object> p)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
