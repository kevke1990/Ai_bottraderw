# AI BotTrader op TrueNAS SCALE

De app is als Docker/Compose-app voorbereid. Moderne TrueNAS SCALE-versies gebruiken Docker en ondersteunen Custom Apps via YAML/Compose. Zie de officiële TrueNAS-documentatie voor Custom Apps.

## 1. Dataset
Maak bijvoorbeeld een dataset `apps/ai-bottrader` en geef de Apps-service toegang.

## 2. Repository
Clone de repository op een machine waarop Docker beschikbaar is, of gebruik de GitHub-repository als bron voor je build.

## 3. Environment
Maak `.env` vanuit `.env.example` en vul minimaal één provider in:

```env
AI_PROVIDER=openai
AI_COUNCIL=openai,anthropic,google
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
GEMINI_API_KEY=...
```

Laat ongebruikte keys leeg. Bewaar echte keys nooit in GitHub.

## 4. Docker Compose

```bash
docker compose up -d --build
```

Open daarna `http://TRUENAS-IP:3000`.

## 5. Via TrueNAS UI
Ga naar **Apps > Discover Apps > Custom App > Install via YAML**. TrueNAS ondersteunt daar Docker Compose YAML voor custom applications. Je kunt de repository lokaal bouwen en een image beschikbaar maken, of een eigen container registry gebruiken.

Voor productie is een registry-image aan te raden, bijvoorbeeld `ghcr.io/<account>/ai-bottrader:latest`.

## 6. Reverse proxy
Gebruik bij voorkeur HTTPS via een reverse proxy (bijvoorbeeld Nginx Proxy Manager, Traefik of Caddy). Stel de app niet rechtstreeks publiek bloot zonder authenticatie/TLS.

## 7. Data
De huidige MVP gebruikt demo-data. Voor echte wereldwijde aandelen moet `market-data` worden gekoppeld aan een gelicentieerde provider. De AI mag nooit verzonnen koers- of fundamentalsdata gebruiken.
