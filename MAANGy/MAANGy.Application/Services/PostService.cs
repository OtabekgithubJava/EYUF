using System.Globalization;
using MAANGy.Application.Abstractions;
using MAANGy.Domain.DTOs;
using MAANGy.Domain.Models;
using MAANGy.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace MAANGy.Application.Services;

public class PostService : IPostService
{
    private readonly ApplicationDbContext _db;

    public PostService(ApplicationDbContext db)
    {
        _db = db;
    }

    public async Task<string> CreatePost(PostDTO postDto)
    {
        var newPost = new Post
        {
            Type = postDto.Type,
            Title = postDto.Title,
            Content = postDto.Content,
            Read_Minutes = postDto.Read_Minutes,
            PhotoPath = postDto.PhotoUrl ?? "https://camo.githubusercontent.com/69ff7fdf6b39289f681df8b422420dd94fbd990376df5602d00bd07a1a988069/68747470733a2f2f616b6d2d696d672d612d696e2e746f73736875622e636f6d2f696e646961746f6461792f696d616765732f73746f72792f3230323130362f4641414e475f636f6d70616e6965735f31323030783736382e6a7065673f4448536a75574f6344695f4e49567049304f33526235773752485a4d772e575f2673697a653d3737303a343333",
            Hashtags = postDto.Hashtags,
            Date = DateTime.UtcNow.ToString("dd.MM.yyyy HH:mm"), 
            IsRecommended = postDto.IsRecommended,
            Company = postDto.Company,
            Country = postDto.Country
        };

        await _db.Posts.AddAsync(newPost);
        await _db.SaveChangesAsync();

        return "Post Created!";
    }

    public async Task<string> UpdatePost(Guid id, PostDTO postDto)
    {
        var post = await _db.Posts.FindAsync(id);

        if (post == null)
        {
            return null;
        }

        post.Type = postDto.Type;
        post.Title = postDto.Title;
        post.Content = postDto.Content;
        post.Read_Minutes = postDto.Read_Minutes;
        post.Date = DateTime.UtcNow.ToString("dd.MM.yyyy HH:mm"); 
        post.Hashtags = postDto.Hashtags;
        post.IsRecommended = postDto.IsRecommended;
        post.Company = postDto.Company;
        post.Country = postDto.Country;

        await _db.SaveChangesAsync();

        return "Post Updated!";
    }

    public async Task<string> DeletePost(Guid id)
    {
        var post = await _db.Posts.FindAsync(id);

        if (post == null)
        {
            return null;
        }

        _db.Posts.Remove(post);
        await _db.SaveChangesAsync();

        return "Post Deleted!";
    }

    public async Task<List<Post>> GetAllPosts()
    {
        return await _db.Posts.ToListAsync();
    }

    public async Task<Post> GetPostById(Guid id)
    {
        var post = await _db.Posts.FindAsync(id);

        if (post == null)
        {
            return null;
        }

        return post;
    }

    public async Task<List<Post>> GetLastSevenPosts()
    {
        var posts = (await _db.Posts
                .ToListAsync())
            .OrderByDescending(p => DateTime.ParseExact(p.Date, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture))
            .Take(7)
            .ToList();

        return posts;
    }

    public async Task<List<Post>> GetRecommendedPosts()
    {
        return await _db.Posts
            .Where(p => p.IsRecommended == true)
            .Take(5)
            .ToListAsync();
    }

    public async Task<List<Post>> GetPostsByCompany(string company)
    {
        return await _db.Posts
            .Where(p => p.Company == company)
            .ToListAsync();
    }

    public async Task<List<Post>> GetNews()
    {
        var news = (await _db.Posts
                .Where(p => p.Type == "News")
                .ToListAsync())
            .OrderByDescending(p => DateTime.ParseExact(p.Date, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture))
            .Take(5)
            .ToList();

        return news;
    }
}