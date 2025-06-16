using MAANGy.Domain.DTOs;
using MAANGy.Domain.Models;

namespace MAANGy.Application.Abstractions;

public interface IPostService
{
    public Task<string> CreatePost(PostDTO postDto);
    public Task<string> UpdatePost(Guid id, PostDTO postDto);
    public Task<string> DeletePost(Guid id);
    public Task<List<Post>> GetAllPosts();
    public Task<Post> GetPostById(Guid id);
    public Task<List<Post>> GetLastSevenPosts();
    public Task<List<Post>> GetRecommendedPosts();
    public Task<List<Post>> GetPostsByCompany(string company);
    public Task<List<Post>> GetNews();
}