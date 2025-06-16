using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using IdentityUser.Application.Abstractions;
using IdentityUser.Domain.DTO;
using IdentityUser.Domain.Model;
using IdentityUser.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace IdentityUser.Application.Services;

public class AuthenticationService: IAuthenticationInterface
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _configuration;

    public AuthenticationService(ApplicationDbContext db, IConfiguration configuration)
    {
        _db = db;
        _configuration = configuration;
    }

    public async Task<LoginResponseDTO> Login(LoginDTO model)
    {
        var user = await _db.Users.FirstOrDefaultAsync(
            u => u.Password == model.Password && u.UserName == model.Username
        );

        if (user == null)
        {
            return new LoginResponseDTO
            {
                Token = "null",
                Message = "Bunday foydalanuvchi mavjud emas",
                Code = 404
            };
        }

        var token = await GenerateToken(user);

        return new LoginResponseDTO
        {
            Token = token,
            Message = "Siz muvaffaqqiyatli acoountga o'tdingiz!",
            Code = 201
        };
    }

    public async Task<string> Register(UserDTO model)
    {
        var newUser = new User
        {
            Fullname = model.Fullname,
            Location = model.Location,
            Password = model.Password,
            Email = model.Gmail,
            UserName = model.Username,
            CreatedAt = Convert.ToString(DateTime.Now, CultureInfo.InvariantCulture),
            PasswordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(model.Password)
        };

        await _db.Users.AddAsync(newUser);
        await _db.SaveChangesAsync();

        return "User Created!";
    }
    
    
    private async Task<string> GenerateToken(Microsoft.AspNetCore.Identity.IdentityUser user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expires = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}