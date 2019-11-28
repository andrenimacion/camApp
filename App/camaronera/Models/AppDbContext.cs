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

        internal Task FirstOrDefaultAsync(Func<object, object> p)
        {
            throw new NotImplementedException();
        }
    }
}
