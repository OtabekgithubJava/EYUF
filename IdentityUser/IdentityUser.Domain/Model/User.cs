namespace IdentityUser.Domain.Model;

public class User: Microsoft.AspNetCore.Identity.IdentityUser, IUserDates
{
    public string Fullname { get; set; }
    public string Password { get; set; }
    public string Location { get; set; }
    public string? CreatedAt { get; set; }
    public string? UpdatedAt { get; set; }
    public string? DeletedAt { get; set; }
}