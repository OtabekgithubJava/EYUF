using MAANGy.Application.Abstractions;
using MAANGy.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MAANGy.Application;

public static class ApplicationDependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection service)
    {
        service.AddScoped<IPostService, PostService>();
        
        return service;
    }
}