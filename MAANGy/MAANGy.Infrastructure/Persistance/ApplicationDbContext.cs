using MAANGy.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace MAANGy.Infrastructure.Persistance;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
        : base(options)
    {
        
    }
    
    public DbSet<Post> Posts { get; set; }
}