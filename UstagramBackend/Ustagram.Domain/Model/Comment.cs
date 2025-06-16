namespace Ustagram.Domain.Model;

public class Comment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Content { get; set; }
    public string Date { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; }
    
    public Guid PostId { get; set; }
    public Post Post { get; set; }
}