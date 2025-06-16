using Microsoft.EntityFrameworkCore;
using Ustagram.Application.Abstractions;
using Ustagram.Domain.DTOs;
using Ustagram.Domain.Model;
using Ustagram.Infrastructure.Persistance;

namespace Ustagram.Application.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _db;

    public UserService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<string> CreateUser(UserDTO userDto)
    {
        var newUser = new User
        {
            FullName = userDto.FullName,
            Username = userDto.Username,
            Phone = userDto.Phone,
            Location = userDto.Location,
            PhotoPath = userDto.PhotoPath,
            Dob = userDto.Dob,
            Status = userDto.Status,
            MasterType = userDto.MasterType,
            Bio = userDto.Bio,
            Experience = userDto.Experience,
            TelegramUrl = userDto.TelegramUrl,
            InstagramUrl = userDto.InstagramUrl
        };

        await _db.Users.AddAsync(newUser);
        await _db.SaveChangesAsync();

        return "Data Created!!!";
    }

    public async Task<List<User>> GetAllUsers()
    {
        return await _db.Users.Include(u => u.Posts).Include(u => u.Favourites).ToListAsync();
    }
}