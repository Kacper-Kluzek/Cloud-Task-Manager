# Cloud Task Manager - Backend API

To jest komponent backendowy aplikacji Cloud Task Manager. Jest to usługa RESTful API zbudowana w ASP.NET Core 9 i Entity Framework Core, oparta na bazie danych PostgreSQL. Obsługuje standardowe operacje CRUD (tworzenie, odczyt, aktualizacja, usuwanie) dla zadań.

## Wykorzystane technologie

*   **ASP.NET Core 9** - Framework Web API
*   **Entity Framework Core (EF Core)** - ORM do dostępu do bazy danych
*   **Npgsql** - Dostawca danych .NET dla PostgreSQL
*   **PostgreSQL** - Relacyjna baza danych
*   **Docker** - Konteneryzacja

## Wymagania wstępne

*   .NET 9.0 SDK (aby rozwijać aplikację lokalnie)
*   Docker & Docker Compose (do jednoczesnego uruchamiania bazy danych i aplikacji)

## Konfiguracja

Aplikacja wymaga zdefiniowania parametrów połączenia (connection string) z bazą PostgreSQL. Upewnij się, że plik `appsettings.json` lub zmienne środowiskowe zawierają wartość `DefaultConnection`.

W pliku `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=postgres_db;Database=tasksdb;Username=admin;Password=password123"
  }
}
```

## Uruchamianie lokalnie

1.  **Uruchom bazę danych PostgreSQL**: Możesz uruchomić ją lokalnie lub użyć Dockera.
    ```bash
    docker run --name my-postgres -e POSTGRES_PASSWORD=password123 -p 5432:5432 -d postgres:15
    ```

2.  **Przywróć zależności i uruchom**:
    Przejdź do katalogu `backend` i uruchom:
    ```bash
    dotnet restore
    dotnet run
    ```
    
    Migracje bazy danych są aplikowane automatycznie podczas startu aplikacji (`db.Database.EnsureCreated()`), więc oddzielny krok `dotnet ef database update` nie jest wymagany, aby uruchomić aplikację po raz pierwszy.

## Endpointy API

Podstawowy adres URL to zazwyczaj `/api/tasks`.

*   **`GET /api/tasks`**: Pobierz wszystkie zadania.
*   **`GET /api/tasks/{id}`**: Pobierz konkretne zadanie po jego GUID.
*   **`POST /api/tasks`**: Utwórz nowe zadanie.
*   **`PUT /api/tasks/{id}`**: Zaktualizuj istniejące zadanie.
*   **`DELETE /api/tasks/{id}`**: Usuń zadanie.

## Docker Compose

Najprostszym sposobem na uruchomienie zarówno frontendu, jak i backendu jest wywołanie komendy z poziomu głównego katalogu na poziomie solucji:

```bash
docker-compose up -d --build
```

To polecenie powoła do życia równocześnie kontenery `api_server`, `postgres_db` oraz `client_app`.
