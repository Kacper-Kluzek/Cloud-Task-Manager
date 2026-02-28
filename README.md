# Cloud Task Manager
### Autor: Kacper Kluzek
**Numer studenta:** 96831

---

##  Stos Technologiczny (Tech Stack)

Aplikacja została zaprojektowana w architekturze 3-warstwowej, wykorzystując najnowsze wersje stabilnych frameworków:

* **Frontend:** React 19 (z wykorzystaniem Server Components i nowoczesnego routingu)
* **Backend:** .NET 9 
* **Baza danych:** PostgreSQL 15 (uruchamiana w kontenerze Docker)
* **Konteneryzacja:** Docker & Docker Compose

---

##  Deklaracja Architektoniczna (Azure Mapping)

Poniższa tabela przedstawia, jak poszczególne kontenery lokalne zostaną zmapowane na profesjonalne usługi chmurowe Microsoft Azure w fazie wdrożenia.

| Komponent Aplikacji | Usługa Lokalna (Docker) | Usługa Chmurowa (Azure) | Uzasadnienie |
| :--- | :--- | :--- | :--- |
| **Warstwa Prezentacji** | Kontener `frontend` | **Azure Static Web Apps** | Optymalizacja pod kątem wydajności (CDN) i automatyczne skalowanie frontendu. |
| **Warstwa Logiki** | Kontener `backend` | **Azure App Service (for Containers)** | Łatwe zarządzanie kontenerami Dockerowymi z pełnym wsparciem dla HTTPS i skalowania. |
| **Warstwa Danych** | Kontener `database` | **Azure Database for PostgreSQL** | Zarządzalna usługa bazy danych (Managed DB) z automatycznymi backupami i wysoką dostępnością. |
| **Przechowywanie Obrazów** | Docker Build | **Azure Container Registry (ACR)** | Prywatne repozytorium do bezpiecznego przechowywania obrazów Docker. |

---

##  Status Projektu
* [x] **Artefakt 1:** Zaplanowano strukture folderów i diagram C4 
* [x] **Artefakt 2:** Środowisko wielokontenerowe uruchomione lokalnie (Docker Compose).
