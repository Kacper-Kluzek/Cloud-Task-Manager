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
| **Warstwa Prezentacji** | Kontener `frontend` | **Azure Container Apps** | Niezależnie skalowalne środowisko kontenerowe idealne dla mikroserwisów. |
| **Warstwa Logiki** | Kontener `backend` | **Azure Container Apps** | Łatwe zarządzanie kontenerami Dockerowymi z pełnym wsparciem dla HTTPS i skalowania. |
| **Warstwa Danych** | Kontener `database` | **Azure Database for PostgreSQL** | Zarządzalna usługa bazy danych (Managed DB) z automatycznymi backupami i wysoką dostępnością. |
| **Przechowywanie Obrazów** | Docker Build | **Docker Hub** | Popularny scentralizowany rejestr obrazów zintegrowany z wdrożeniami na platformie Azure. |

---

##  Status Projektu
* [x] **Artefakt 1:** Zaplanowano strukture folderów i diagram C4 
* [x] **Artefakt 2:** Środowisko wielokontenerowe uruchomione lokalnie (Docker Compose).
* [x] **Artefakt 3:** Działająca warstwa prenzentacji
* [x] **Artefakt 4:** Działająca warstwa logiki, bazy danych i Docker
* [x] **Artefakt 5:** System gotowy na chmurę
* [x] **Artefakt 6:** Aplikacja wdrożona w Azure
