namespace IdentityUser.Domain.DTO;

public class LoginResponseDTO
{
    public string Token { get; set; }
    public string Message { get; set; }
    public int Code { get; set; }
}