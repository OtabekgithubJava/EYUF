namespace MAANGy.Domain.Models;

public class Post
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Type { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Read_Minutes { get; set; }
    public string PhotoPath { get; set; }
    public string? Date { get; set; }
    public List<string> Hashtags { get; set; } = new List<string>();
    public bool IsRecommended { get; set; }
    public string Company { get; set; }
    public string Country { get; set; }
}