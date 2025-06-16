namespace Ustagram.Domain.Model;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string FullName { get; set; }
    public string Username { get; set; }
    public string Phone { get; set; }
    public string Location { get; set; }
    public string PhotoPath { get; set; }
    public string Dob { get; set; }
    public string Status { get; set; }
    public string MasterType { get; set; }
    public string Bio { get; set; }
    public int Experience { get; set; }
    public string TelegramUrl { get; set; }
    public string InstagramUrl { get; set; }

    public List<Post> Posts { get; set; } = new List<Post>();
    public List<Favourites> Favourites { get; set; } = new List<Favourites>();
}