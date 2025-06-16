using Microsoft.OpenApi.Models;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using MAANGy.Application;
using MAANGy.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace MAANGy.API
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // modelimizdagi hamma ozgaruvchi nomini LOWER() qilib beradi
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                });
            builder.Services.AddEndpointsApiExplorer();
            
            builder.Configuration
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            
            builder.Services.AddInfrastructure(builder.Configuration);
            builder.Services.AddApplication();
            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
            });
            
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new OpenApiInfo { Title = "MAANGy", Version = "v1.0.0", Description = "SWE" });
            });

            var app = builder.Build();
            
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
    
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
            app.MapControllers();
            app.Run();
        }
    }
}