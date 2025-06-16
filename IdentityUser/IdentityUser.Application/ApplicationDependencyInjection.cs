using IdentityUser.Application.Abstractions;
using IdentityUser.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityUser.Application;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection service)
    {
        service.AddScoped<IAuthenticationInterface, AuthenticationService>();
        service.AddScoped<IUserInterface, UserService>();

        return service;
    }
}