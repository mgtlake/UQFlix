# UQFlix
Like netflix but free; like couchtuner but legal

# Installation
1. Install the latest [dotnet core](https://www.microsoft.com/net/core) binary
2. Run the database migrations `dotnet ef database update` from `UQFlix/src/UQFlix`
3. Load the data from `UQFlix/dbo.movies.data.sql` into `(localdb)\mssqllocaldb`
4. Run it!