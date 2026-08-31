# AI BotTrader

AI BotTrader is a standalone-first global equity intelligence dashboard. It can open directly as `public/index.html`, or run as a Node/Docker application for live AI integrations.

## The 16 modules
1. Global stock universe
2. Interactive price/chart layer
3. Technical analysis
4. Fundamental analysis
5. News aggregation
6. Sentiment analysis
7. AI scoring 0-100
8. Multi-AI consensus
9. Watchlists/favorites
10. Price/AI/news alerts
11. AI Top Opportunities
12. Risk scoring and limits
13. Earnings calendar
14. Portfolio and paper trading
15. Backtesting lab
16. AI research reports with Bull/Bear/Judge reasoning

The UI contains the full workflow. The included seed data is intentionally small; production deployment should connect a licensed market-data provider for the global universe, historical OHLCV, fundamentals, corporate actions, news and filings.

## AI providers
OpenAI/ChatGPT, Anthropic/Claude and Google Gemini are supported through one server-side adapter layer. Use `AI_PROVIDER` for one provider or `AI_COUNCIL=openai,anthropic,google` for parallel multi-AI analysis.

API keys stay server-side. See `docs/AI_PROVIDERS.md`.

## Standalone HTML
Open `public/index.html` directly in a browser. It works without a server using local demo data, favorites and the UI. Live API calls require the backend.

## Node
```bash
npm install
cp .env.example .env
# edit .env
npm start
```
Open `http://localhost:3000`.

## Docker / TrueNAS
```bash
docker compose up -d --build
```
Open port 3000. See `docs/TRUENAS.md`. TrueNAS SCALE supports Custom Apps and Docker Compose YAML for third-party applications.

## Production architecture
For a real global product, add a database (PostgreSQL), Redis/cache, a licensed market-data/news provider, scheduled ingestion workers, authentication, HTTPS, audit logs and a dedicated backtesting service. Keep AI keys and provider calls on the backend.

## Safety
AI output is research assistance, not guaranteed financial advice. Never enable live trading merely because an AI says BUY. Paper trading, position limits, data-quality validation, slippage/fees and independent checks should come first.
