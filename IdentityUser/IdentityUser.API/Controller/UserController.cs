using IdentityUser.Application.Abstractions;
using IdentityUser.Domain.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IdentityUser.API.Controller;

[Route("api/[controller]/[action]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserInterface _service;

    public UserController(IUserInterface service)
    {
        _service = service;
    }


    [HttpGet]
    public async Task<ActionResult<List<User>>> AllUsers()
    {
        return await _service.AllUsers();
    }

    
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<List<User>>> Search(string term)
    {
        return await _service.Search(term);
    }
}