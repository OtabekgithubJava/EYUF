using Microsoft.AspNetCore.Http;

namespace MAANGy.Domain.DTOs;

public class PostDTO
{
    public string Type { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public int Read_Minutes { get; set; }
    // public IFormFile? Photo { get; set; }
    public string PhotoUrl { get; set; }
    public List<string> Hashtags { get; set; } = new List<string>();
    public bool IsRecommended { get; set; }
    public string Company { get; set; }
    public string Country { get; set; }
}