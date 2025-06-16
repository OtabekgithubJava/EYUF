namespace Ustagram.Domain.DTOs;

public class CommentDTO
{
    public string Content { get; set; }
    public string Date { get; set; }
    public Guid UserId { get; set; }
    public Guid PostId { get; set; }
}