using IdentityUser.Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace IdentityUser.Infrastructure.Persistance;

public class ApplicationDbContext: DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }
}