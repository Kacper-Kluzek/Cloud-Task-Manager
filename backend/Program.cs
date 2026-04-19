using Microsoft.EntityFrameworkCore;
using backend.Data;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

var keyVaultUrl = builder.Configuration["KEYVAULT_URL"];

if (!string.IsNullOrEmpty(keyVaultUrl))
{
    builder.Configuration.AddAzureKeyVault(new Uri(keyVaultUrl), new DefaultAzureCredential());
}
else 
{
    DotNetEnv.Env.Load();
}

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:8080", "https://frontend-ctm.wittywave-7b5f94c5.swedencentral.azurecontainerapps.io")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var connectionString = builder.Configuration["DbConnectionString"] 
                       ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    try 
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Database.Migrate(); 
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Błąd podczas migracji: {ex.Message}");
    }
}

app.Run();