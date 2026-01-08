using Microsoft.EntityFrameworkCore;
using Project3.Data;
var builder = WebApplication.CreateBuilder(args);

// --- תיקון 1: הגדרת הפורט במיוחד ל-Clever Cloud ---
builder.WebHost.UseUrls("http://0.0.0.0:8080");

// הוספת שירותים (Services)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// הגדרת החיבור ל-MySQL
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

var app = builder.Build();

// --- תיקון 2: הפעלת Swagger תמיד (מחקנו את ה-if) ---
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();

app.MapControllers();

app.Run();