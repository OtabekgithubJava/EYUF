using Microsoft.Extensions.DependencyInjection;
using Ustagram.Application.Abstractions;
using Ustagram.Application.Services;

namespace Ustagram.Application;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection service)
    {
        service.AddScoped<IUserService, UserService>();

        return service;
    }
}