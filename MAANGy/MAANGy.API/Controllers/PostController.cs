using MAANGy.Application.Abstractions;
using MAANGy.Domain.DTOs;
using MAANGy.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace MAANGy.API.Controllers;

[ApiController]
[Route("api/[controller][action]")]
public class PostController : Controller
{

    private readonly IPostService _service;

    public PostController(IPostService service)
    {
        _service = service;
    }


    [HttpPost]
    public async Task<ActionResult<string>> CreatePost(PostDTO postDto)
    {
        return await _service.CreatePost(postDto);
    }

    [HttpPut]
    public async Task<ActionResult<string>> UpdatePost(Guid id, PostDTO postDto)
    {
        var result = await _service.UpdatePost(id, postDto);

        if (result == null)
        {
            return BadRequest("404 Not Found!");
        }

        return Ok(result);
    }


    [HttpDelete]
    public async Task<ActionResult<string>> DeletePost(Guid id)
    {
        var result = await _service.DeletePost(id);

        if (result == null)
        {
            return BadRequest("404 Not Found!");
        }

        return Ok(result);
    }
    

    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetAllPosts()
    {
        return await _service.GetAllPosts();
    }

    [HttpGet]
    public async Task<ActionResult<Post>> GetPostById(Guid id)
    {
        return await _service.GetPostById(id);
    }

    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetLastSevenPosts()
    {
        return await _service.GetLastSevenPosts();
    }

    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetRecommendedPosts()
    {
        return await _service.GetRecommendedPosts();
    }


    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetPostsByCompany(string company)
    {
        return await _service.GetPostsByCompany(company);
    }


    [HttpGet]
    public async Task<ActionResult<List<Post>>> GetNews()
    {
        return await _service.GetNews();
    }
}