#  TodoList Fullstack - Practicode Project 3 & 4

אפליקציית Fullstack מודרנית לניהול משימות עם עיצוב מטורף וDeploy לענן.

##  תיאור הפרויקט

פרויקט 3 & 4 בפרקטיקוד - בנייה של אפליקציית TodoList מלאה עם:
- **Backend**: ASP.NET Core 8 (Minimal API)
- **Frontend**: React 18
- **Database**: SQLite (לוקלי) / MySQL (לענן)
- **Deployment**: Docker + Render + CleverCloud

---

##  תכונות

 **הוספת משימות** - הוסף משימות חדשות בקלות  
 **סימון כהושלם** - סמן משימות כהושלמות  
 **מחיקת משימות** - הסר משימות שלא צריך יותר  
 **עיצוב מטורף** - Glass morphism עם gradients מנודדים  
 **API REST מלא** - Backend עם כל ה-CRUD operations  
 **Real-time Updates** - משימות מתעדכנות מיד  
 **Responsive Design** - עובד על כל הגדלי המסכנים  
 **Docker Ready** - מוכן ל-Deploy בענן

---

##  טכנולוגיות

### Backend
- **Framework**: ASP.NET Core 8 (Minimal API)
- **Database**: SQLite (לוקלי) / MySQL (ענן)
- **ORM**: Entity Framework Core
- **Auth**: JWT Token Authentication
- **Documentation**: Swagger/OpenAPI
- **API Port**: 5245 / 80 (ענן)
- **Containerization**: Docker

### Frontend
- **Framework**: React 18
- **HTTP Client**: Axios
- **Styling**: Custom CSS (Glass Morphism)
- **Font**: Rubik (Hebrew Support - RTL)
- **Port**: 3000

### DevOps & Cloud
- **Containerization**: Docker
- **Backend Hosting**: Render (Web Service)
- **Frontend Hosting**: Render (Static Site)
- **Database**: CleverCloud (MySQL)

---

##  מבנה הפרויקט

```
Project3/
 TodoApi/                    # Backend .NET
    Program.cs             # Main configuration & routes
    Models/
       Item.cs            # Task model
       User.cs            # User model (for JWT)
    Data/
       ToDoDbContext.cs    # EF Core context
    appsettings.json        # Configuration
    Dockerfile              # Docker configuration
    TodoApi.csproj
    todolist.db             # SQLite database

 ToDoListReact-master/       # Frontend React
    src/
       pages/
          Login.js        # Login page (optional)
          Register.js     # Register page (optional)
          TodoList.js     # Main todo list
       styles/
          Auth.css        # Auth styling
          TodoList.css    # Todo list styling
       App.js              # Main component
       index.js            # Entry point
       service.js          # API calls
       axiosInstance.js    # Axios config
    package.json
    public/

 Dockerfile                  # Backend Docker config
 .gitignore                  # Git ignore patterns
 README.md                   # This file
 .env.local                  # Environment variables (local)
```

---

##  התקנה והרצה (לוקלי)

### דרישות מקדימות
-  Node.js (v14+)
-  .NET 8 SDK
-  npm or yarn
-  Docker (לבדיקת ה-build)

### Backend Setup

```bash
# Navigate to backend
cd TodoApi

# Restore NuGet packages
dotnet restore

# Run with hot reload
dotnet watch run
```

 Server will run on: **http://localhost:5245**
 Swagger Docs: **http://localhost:5245/swagger**

### Frontend Setup

```bash
# Navigate to frontend
cd ToDoListReact-master

# Install npm packages
npm install

# Start development server
npm start
```

 Client will run on: **http://localhost:3000**

---

##  Build Docker Image (לוקלי)

```bash
cd TodoApi

# Build image
docker build -t todoapi:latest .

# Run container
docker run -p 5245:80 -e ASPNETCORE_URLS=http://+:80 todoapi:latest
```

---

##  API Routes

### Tasks (משימות)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/items` |  | Get all tasks |
| POST | `/items` |  | Create new task |
| PUT | `/items/{id}` |  | Update task |
| DELETE | `/items/{id}` |  | Delete task |

### Authentication (אחרי הוספה)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | User login |
| POST | `/register` | User registration |

### Info
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API status |

---

##  Database Schema

### Items Table
```sql
CREATE TABLE Items (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT,
  IsComplete INTEGER
);
```

### Users Table (optional)
```sql
CREATE TABLE Users (
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Username TEXT UNIQUE,
  Password TEXT
);
```

---

##  UI Features

 **Glass Morphism Design**
- Frosted glass effect with backdrop blur
- Smooth animations and transitions

 **Animated Gradients**
- Background gradients shift every 15 seconds
- Beautiful color combinations

 **Responsive**
- Works on desktop, tablet, mobile
- Touch-optimized buttons

 **Hebrew Support**
- RTL (Right-to-Left) layout
- Rubik font family
- Hebrew input support

---

##  Deploy to Cloud (Project 4)

###  דרך א: Deploy ל-Render

#### 1 Create Account
- Go to https://render.com
- Sign up with GitHub account

#### 2 Create Web Service (Backend)

1. ct Repository**
   - Click "New +"  "Web Service"
   - Connect your GitHub repo
   - Select repository: `TodoList-FullStack-practicode4-`

2. **Configure Settings**
   - **Name**: `todoapi-service`
   - **Environment**: Docker
   - **Region**: Choose closest to you
   - **Branch**: `main`

3. **Set Environment Variables**
   ```
   ASPNETCORE_URLS=http://+:80
   ConnectionStrings__ToDoDB=<MYSQL_CONNECTION_STRING>
   Jwt__Key=<YOUR_SECRET_KEY>
   ```

4. **Deploy** 
   - Render will automatically build and deploy

#### 3 Setup MySQL Database (CleverCloud)

1. Go to https://clever-cloud.com
2. Sign up / Log in
3. Create MySQL database
   - Database name: `ToDoList`
   - Copy connection string

4. Add connection string to Render environment variables

#### 4 Create Static Site (Frontend)

1. Click "New +"  "Static Site"
2. Connect same repository
3. **Configure Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `build`
   - **Root Directory**: `ToDoListReact-master`

4. **Set Environment Variables**
   ```
   REACT_APP_API_URL=https://your-api-url.onrender.com
   ```

5. **Deploy** 

#### 5 Update Frontend Axios URL

בקובץ `ToDoListReact-master/src/axiosInstance.js`:

```javascript
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5245';
```

---

##  Environment Variables

### Backend (.env or Render)
```env
ASPNETCORE_URLS=http://+:80
ConnectionStrings__ToDoDB=Server=<host>;Port=3306;Database=ToDoList;User=<user>;Password=<password>
Jwt__Key=your-secret-key-min-32-characters-here
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:5245
```

---

##  Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5245
netstat -ano | findstr :5245
taskkill /PID <PID> /F
```

### Docker Build Issues
```bash
# Clear Docker cache
docker system prune

# Rebuild image
docker build --no-cache -t todoapi:latest .
```

### Database Connection Error
- Check MySQL connection string
- Verify database exists on CleverCloud
- Confirm environment variables in Render

### Frontend Cact to Backend
-  Check `REACT_APP_API_URL` environment variable
- Verify backend URL is correct
- Check CORS settings in `Program.cs`

### CORS Issues
In `Program.cs`, CORS already configured:
```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
```

---

##  Performance

 **Fast API** - Responses <100ms  
 **Optimized Bundle** - React optimized build  
 **Real-time** - Instant updates  
 **Efficient** - Minimal re-renders  
 **Scalable** - Cloud-ready infrastructure

---

##  Learning Resources

- [ASP.NET Core Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core/)
- [React Documentation](https://react.dev)
- [Axios HTTP Client](https://axios-http.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Render Deployment Guide](https://render.com/docs)
- [Clever Cloud MySQL](https://www.clever-cloud.com/doc/databases/mysql/)

---

##  Project Checklist

###  Project 3 (Local Development)
- [x] ASP.NET Core Minimal API
- [x] Entity Framework with SQLite
- [x] CRUD Operations (GET/POST/PUT/DELETE)
- [x] CORS Configuration
- [x] Swagger Documentation
- [x] React Frontend
- [x] Axios Service Layer
- [x] Beautiful UI Design (Glass Morphism)
- [x] JWT Authentication (optional)
- [x] GitHub Repository

###  Project 4 (Deployment)
- [x] Docker configuration
- [x] Dockerfile created
- [x] .gitignore setup
- [ ] Render account setup
- [ ] Backend deployment to Render
- [ ] Frontend deployment to Render
- [ ] MySQL database on CleverCloud
- [ ] Environment variables configuration
- [ ] Production testing

---

##  Made with 

**Built by**: Practicode Student  
**Course**: Practicode Bootcamp - Projects 3 & 4  
**Instructor**: מלכה ברוק  
**Updated**: February 2026

---

##  Links

-  **GitHub Repository**: https://github.com/gd3285-ship-it/TodoList-FullStack-practicode4-
-  **Practicode Academy**: https://practicode.co.il
-  **Render**: https://render.com
-  **CleverCloud**: https://clever-cloud.com

---

##  License

This is a learning project for Practicode bootcamp. Free to use and modify.

---

**צלחה בהעלאה לענן! **

Happy Coding & Deploying!
