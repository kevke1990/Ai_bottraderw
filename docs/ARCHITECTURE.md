# Architectuur

## Doel
Een wereldwijde equity research terminal met een verwisselbare AI-laag.

## Datastromen

```text
Market data ─┐
Fundamentals ─┤
News/filings ─┼─> Normalized research object ─> AI provider ─> Structured analysis ─> Dashboard
Macro data ───┘
```

## Belangrijkste modules
- Universe: tickers, exchanges, identifiers en instrumentstatus
- Quotes: realtime/delayed quotes en historische candles
- Fundamentals: financial statements, ratios en earnings
- News: headlines, sentiment en bronmetadata
- Research engine: technische indicatoren + fundamentals + risk
- AI gateway: OpenAI, Anthropic en Google adapters
- Watchlists: favorieten, tags en custom lists
- Alerts: score changes, price moves, news and earnings
- Portfolio: holdings, cost basis, P/L and exposure
- Backtesting: reproduceerbare strategieën met timestamped data
- Audit: bewaren van input-data snapshot, provider, model en output

## Roadmap
1. MVP dashboard + provider abstraction
2. Real market-data adapter and global symbol sync
3. Historical data + technical indicators
4. Fundamentals + news + filings
5. AI ranking and multi-stock comparison
6. Alerts and scheduled scans
7. Portfolio/paper trading
8. Backtesting
9. Authentication, database and deployment
10. Production observability and data-quality controls

## Ontwerpkeuze
AI is bewust niet gekoppeld aan één leverancier. De frontend praat alleen met `/api/analyze`; de backend kiest de provider. Hierdoor kan dezelfde analyseprompt met OpenAI, Claude of Gemini worden uitgevoerd.