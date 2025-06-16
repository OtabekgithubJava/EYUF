using IdentityUser.Application.Abstractions;
using IdentityUser.Domain.DTO;
using Microsoft.AspNetCore.Mvc;

namespace IdentityUser.API.Controller;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationInterface _service;

    public AuthController(IAuthenticationInterface service)
    {
        _service = service;
    }


    [HttpPost]
    public async Task<ActionResult<LoginResponseDTO>> Login(LoginDTO model)
    {
        return await _service.Login(model);
    }

    [HttpPost]
    public async Task<ActionResult<string>> Register([FromForm] UserDTO model)
    {
        var result = await _service.Register(model);
        
        return Ok(new { Message = result } );
    }
}