using IdentityUser.Domain.DTO;

namespace IdentityUser.Application.Abstractions;

public interface IAuthenticationInterface
{
    public Task<LoginResponseDTO> Login(LoginDTO model);
    public Task<string> Register(UserDTO model);
}