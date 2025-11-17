
# App Ref. Card 02
React Application (serverless)

---
title: App Ref. Card 01
author: Rinaldo Lanza, BBW
date: 12. Februar 2023
---

Link zur Übersicht<br/>
https://gitlab.com/bbwrl/m347-ref-card-overview


### Projekt bauen und starten
Die Ausführung der Befehle erfolgt im Projektordner
Builden mit Node/npm<br/>
```$ npm install```

Das Projekt wird gebaut und die entsprechenden Dateien unter dem Ordner node_modules gespeichert.
Die App kann nun mit folgendem Befehl gestartet werden<br/>
```$ npm start```

Die App kann nun im Browser unter der URL http://localhost:3000 betrachtet werden.


### Inbetriebnahme mit Docker Container
1. Docker-Image lokal bauen  
   ```bash
   docker build -t ref-card-02:local .
   ```
2. Container starten  
   ```bash
   docker run --rm -p 8080:80 ref-card-02:local
   ```
3. Die App ist anschliessend via http://localhost:8080 erreichbar (Nginx liefert den Build aus `build/` aus).

### Automatisierter GitHub CI/CD Workflow
Der Workflow `React CI/CD` (`.github/workflows/ci-cd.yml`) führt bei jedem Push und Pull Request auf den Branch `main` folgende Schritte aus:
- Node-Abhängigkeiten installieren, Tests (`npm test -- --watch=false`) und ein Produktions-Build `npm run build` ausführen.
- Ein Docker-Image aus dem Repository bauen.
- Das Image mit zwei Tags (`latest` und Commit-SHA) nach Docker Hub **und** in die GitHub Container Registry (ghcr.io) pushen.

#### Benötigte Secrets
| Secret | Beschreibung |
| --- | --- |
| `DOCKERHUB_USERNAME` | Docker-Hub-Accountname, unter dem das Image veröffentlicht wird. |
| `DOCKERHUB_TOKEN` | Access Token oder Passwort des Docker-Hub-Accounts. |

Für GHCR wird kein zusätzliches Secret benötigt; der Workflow nutzt das automatisch bereitgestellte `GITHUB_TOKEN` mit der Berechtigung `packages: write`.

#### Erwartete Image-Namen
- Docker Hub: `${DOCKERHUB_USERNAME}/ref-card-02`
- GHCR: `ghcr.io/<github-owner>/ref-card-02`

Nach einem erfolgreichen Durchlauf können die geforderten Screenshots direkt aus den GitHub-Actions-Logs, dem Docker-Hub-Repository sowie aus GHCR entnommen werden.
