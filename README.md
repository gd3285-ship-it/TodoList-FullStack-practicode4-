# Todo List Project (Full Stack) 📝

מערכת לניהול משימות המאפשרת יצירה, מחיקה, עדכון וסימון משימות.
הפרויקט נבנה כחלק מתהליך למידה של פיתוח Full Stack.

## 🛠️ טכנולוגיות
* **Server:** C# .NET Web API
* **Client:** React
* **Database:** MySQL

---

## 🚀 הוראות התקנה והרצה

### 1. הקמת מסד הנתונים (MySQL)
יש להריץ את הסקריפט הבא ב-MySQL Workbench או phpMyAdmin:

```sql
CREATE DATABASE IF NOT EXISTS ToDoDB;
USE ToDoDB;

CREATE TABLE IF NOT EXISTS Items (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    IsComplete BOOLEAN DEFAULT FALSE
);
dotnet run
npm install
npm start