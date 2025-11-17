
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
| `AWS_ACCOUNT_ID` | AWS Account-ID, um das ECR-Repository (`<id>.dkr.ecr.<region>.amazonaws.com`) zu adressieren. |
| `AWS_REGION` | AWS-Region (z. B. `us-east-1`), in der das ECR-Repository und der Fargate-Cluster liegen. |
| `ECR_TOKEN` | Ergebnis von `aws ecr get-login-password --region <region>` – muss ca. alle 12 h erneuert werden. |

Für GHCR wird kein zusätzliches Secret benötigt; der Workflow nutzt das automatisch bereitgestellte `GITHUB_TOKEN` mit der Berechtigung `packages: write`.

#### Erwartete Image-Namen
- Docker Hub: `${DOCKERHUB_USERNAME}/ref-card-02`
- GHCR: `ghcr.io/<github-owner>/ref-card-02`
- AWS ECR: `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/ref-card-02`

#### AWS Fargate Schritte (Aufgaben 2 & 3)
1. **ECR Repository**: gemäss Modul-347-Anleitung erstellen und URL notieren. Der Workflow pusht automatisch `latest` und `SHA` dorthin.
2. **ECS/Fargate Service**: Task Definition mit obigem ECR-Image konfigurieren, Service im gewünschten Cluster anlegen.
3. **Manuelles Force-Deployment**: Nach jedem GitHub-Push (neues Image im ECR) im AWS-Console den Service auswählen und „Force new deployment“ auslösen, bis optional eine automatische Auslösung implementiert wird.
4. **Nachweise**: Für jede Aufgabe Screenshots von GitHub Actions (User/Repo/Datum), ECR Push (User/Image/Datum), ECS Service (laufender Task + IP) sowie der im Browser aufgerufenen Anwendung erfassen.

Nach einem erfolgreichen Durchlauf können die geforderten Screenshots direkt aus den GitHub-Actions-Logs, dem Docker-Hub-Repository sowie aus GHCR entnommen werden.
