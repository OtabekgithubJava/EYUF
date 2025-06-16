namespace Ustagram.Domain.DTOs;

public class PostDTO
{
    public string PostType { get; set; }
    public string Text { get; set; }
    public string Description { get; set; }
    public int Price { get; set; }
    public string PhotoPath { get; set; }
    public string Date { get; set; }
    public int Likes { get; set; }
    public int Dislikes { get; set; }
}