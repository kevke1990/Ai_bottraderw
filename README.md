# AI BotTrader

AI BotTrader is a modular stock research dashboard. It is designed to monitor a large global equity universe, maintain watchlists, calculate transparent research signals, and send selected stocks to an AI provider for structured analysis.

## AI providers
The app supports a provider abstraction so you can choose **OpenAI/ChatGPT, Anthropic/Claude, or Google Gemini** without changing the frontend. API keys stay server-side in `.env`.

## Quick start

```bash
npm install
cp .env.example .env
# edit .env and add at least one provider key
npm start
```

Open `http://localhost:3000`.

## Provider setup

### OpenAI / ChatGPT
Set `AI_PROVIDER=openai`, then add `OPENAI_API_KEY`. Set `OPENAI_MODEL` to the model you want to use. The app calls the OpenAI Responses API from the server.

### Anthropic / Claude
Set `AI_PROVIDER=anthropic`, add `ANTHROPIC_API_KEY`, and set `ANTHROPIC_MODEL` to the Claude model available to your account. The server calls Anthropic's Messages API.

### Google Gemini
Set `AI_PROVIDER=google`, add `GEMINI_API_KEY`, and set `GEMINI_MODEL` to the Gemini model available to your account. The server calls Google's Gemini generateContent API.

Never put any of these keys in `index.html`, client-side JavaScript, GitHub Pages, or a public repository.

## Architecture

- `server.js` — HTTP server, API routes, provider abstraction and AI prompt
- `public/` — browser application
- `docs/AI_PROVIDERS.md` — detailed provider setup and security guide
- `docs/ARCHITECTURE.md` — product architecture and roadmap
- `data/` — local development data; production should use a database

## Production market data
The demo includes a small seed universe. To monitor the world's equity markets properly, connect a licensed market-data provider. The provider should supply symbols/exchanges, quotes, corporate actions, fundamentals and (where licensed) news/filings. The market-data interface is intentionally separated from the AI interface.

## Important
AI scores are research assistance, not financial advice. Do not use the demo data or AI output as an automated trading instruction without independent validation, data-quality checks and risk controls.