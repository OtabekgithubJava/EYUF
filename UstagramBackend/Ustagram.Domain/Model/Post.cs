namespace Ustagram.Domain.Model;

public class Post
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string PostType { get; set; }
    public string Text { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string PhotoPath { get; set; }
    public string Date { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    
    public Guid UserId { get; set; }
    public User User { get; set; }

    public List<Comment> Comments { get; set; } = new List<Comment>();
}