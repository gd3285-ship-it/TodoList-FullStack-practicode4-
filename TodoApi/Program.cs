using Microsoft.EntityFrameworkCore;
using TodoApi; 

var builder = WebApplication.CreateBuilder(args);

// הגדרת חיבור למסד הנתונים
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"), 
    Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.36-mysql")));

// הוספת אישור כניסה ל-React (CORS)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

builder.Services.AddControllers();

var app = builder.Build();

// הפעלת האישור
app.UseCors("AllowAll");

app.MapControllers();

// הפעלת השרת
app.Run();