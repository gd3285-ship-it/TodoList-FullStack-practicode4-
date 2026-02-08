# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project file
COPY ["TodoApi/TodoApi.csproj", "./TodoApi/"]

# Restore dependencies
RUN dotnet restore "TodoApi/TodoApi.csproj"

# Copy source code
COPY ./TodoApi ./TodoApi/

# Build the project
RUN dotnet build "TodoApi/TodoApi.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "TodoApi/TodoApi.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy published files from publish stage
COPY --from=publish /app/publish .

# Expose ports for HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# Set environment variable for production
ENV ASPNETCORE_URLS=http://+:80

# Run the application
ENTRYPOINT ["dotnet", "TodoApi.dll"]
