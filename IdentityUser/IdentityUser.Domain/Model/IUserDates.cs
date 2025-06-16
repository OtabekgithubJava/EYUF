namespace IdentityUser.Domain.Model;

public interface IUserDates
{
    public string CreatedAt { get; set; }
    public string UpdatedAt { get; set; }
    public string DeletedAt { get; set; }
}