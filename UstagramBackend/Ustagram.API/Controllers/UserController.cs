using Microsoft.AspNetCore.Mvc;
using Ustagram.Application.Abstractions;
using Ustagram.Domain.DTOs;
using Ustagram.Domain.Model;

namespace Ustagram.API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _service;

    public UserController(IUserService service)
    {
        _service = service;
    }


    [HttpPost]
    public async Task<ActionResult<string>> CreateUser([FromForm] UserDTO userDto)
    {
        return await _service.CreateUser(userDto);
    }


    [HttpGet]
    public async Task<ActionResult<List<User>>> GetAllUsers()
    {
        return await _service.GetAllUsers();
    }
}