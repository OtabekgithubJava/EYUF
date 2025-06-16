using Ustagram.Domain.DTOs;
using Ustagram.Domain.Model;

namespace Ustagram.Application.Abstractions;

public interface IUserService
{
    public Task<string> CreateUser(UserDTO userDto);
    public Task<List<User>> GetAllUsers();
}