using IdentityUser.Domain.Model;

namespace IdentityUser.Application.Abstractions;

public interface IUserInterface
{
    public Task<List<User>> AllUsers();
    public Task<List<User>> Search(string term);
}