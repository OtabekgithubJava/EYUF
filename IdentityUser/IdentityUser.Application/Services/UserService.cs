using IdentityUser.Application.Abstractions;
using IdentityUser.Domain.Model;
using IdentityUser.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace IdentityUser.Application.Services;

public class UserService: IUserInterface
{
    private readonly ApplicationDbContext _db;

    public UserService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<List<User>> AllUsers()
    {
        return await _db.Users.ToListAsync();
    }

    public async Task<List<User>> Search(string term)
    {
        return await _db.Users
            .Where(u => u.Fullname.Contains(term) || u.UserName.Contains(term))
            .ToListAsync();
    }
}