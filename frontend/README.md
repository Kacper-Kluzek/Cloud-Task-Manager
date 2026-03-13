# Cloud Task Manager - Frontend

To jest komponent frontendowy aplikacji Cloud Task Manager, zbudowany przy użyciu React i Vite. Udostępnia tablicę w stylu kanban do zarządzania zadaniami, obsługującą przeciąganie i upuszczanie (drag-and-drop), tworzenie, edycję oraz usuwanie zadań.

## Wykorzystane technologie

*   **React** - Biblioteka interfejsu użytkownika
*   **Vite** - Narzędzie do budowania i serwer deweloperski
*   **Axios** - Klient HTTP
*   **Vanilla CSS** - Niestandardowe style z wykorzystaniem zmiennych CSS i efektu glassmorphism.

## Wymagania wstępne

*   Node.js (wersja 19)
*   npm (lub yarn/pnpm)

## Zmienne środowiskowe

Przed uruchomieniem aplikacji należy skonfigurować niezbędne zmienne środowiskowe. Utwórz plik `.env` w głównym katalogu `frontend`:

```env
VITE_API_URL=http://localhost:8081/api
```

Ten adres URL powinien wskazywać na Twój serwer API backendu.

## Uruchamianie lokalnie (Development)

1.  **Zainstaluj zależności:**
    ```bash
    npm install
    ```

2.  **Uruchom serwer deweloperski:**
    ```bash
    npm run dev
    ```
    Aplikacja będzie standardowo dostępna pod adresem `http://localhost:5173`.

## Docker

Ten projekt zawiera plik `Dockerfile` dla kompilacji produkcyjnych, wykorzystujący Nginx do serwowania statycznej paczki Vite. Cała aplikacja jest orkiestrowana przy użyciu `docker-compose.yml` w głównym katalogu.

Aby zbudować i uruchomić:
```bash
docker-compose up -d --build
```
