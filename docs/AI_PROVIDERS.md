# AI providers koppelen

AI BotTrader gebruikt één backend-interface met drie adapters. Je kiest de actieve provider met `AI_PROVIDER`.

## 1. OpenAI / ChatGPT
1. Maak een API key aan in het OpenAI developer platform.
2. Zet in `.env`:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=plak-hier-je-key
OPENAI_MODEL=gpt-5.6
```

3. Herstart `npm start`.
4. Controleer in de app bij **Instellingen → AI provider** dat OpenAI actief is.

De key wordt uitsluitend server-side gebruikt.

## 2. Anthropic / Claude
1. Maak een Anthropic API key aan.
2. Zet:

```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=plak-hier-je-key
ANTHROPIC_MODEL=claude-sonnet-4-5
```

3. Herstart de server.

## 3. Google Gemini
1. Maak een Gemini API key aan via Google AI Studio / Gemini API.
2. Zet:

```env
AI_PROVIDER=google
GEMINI_API_KEY=plak-hier-je-key
GEMINI_MODEL=gemini-2.5-flash
```

3. Herstart de server.

## Provider wisselen
Je hoeft geen code te wijzigen. Verander alleen `AI_PROVIDER` en herstart:

```env
AI_PROVIDER=openai
```

of `anthropic` of `google`.

## API-key veiligheid
- Commit nooit `.env`.
- Gebruik `.env.example` alleen als template.
- Gebruik in productie een secret manager.
- Zet AI keys nooit in browser JavaScript.
- Log nooit de volledige API response of API key.

## Modelkeuze
Modelnamen veranderen in de tijd. Gebruik daarom de actuele modelnaam die jouw provider/account aanbiedt. De voorbeelden in `.env.example` zijn defaults en kunnen worden aangepast.

## Wat de AI krijgt
De backend stuurt een gestructureerd onderzoeksobject met ticker, beurs, koers, dagverandering en beschikbare markt/fundamentele context. In de productieversie moet dit worden uitgebreid met historische OHLCV, fundamentals, earnings, nieuws, filings, sectorinformatie en macrodata.

## Aanbevolen AI-output
De AI wordt gevraagd om JSON terug te geven met:
- score 0-100
- classificatie: STRONG_BUY / BUY / HOLD / SELL / STRONG_SELL
- confidence
- technical_summary
- fundamental_summary
- sentiment_summary
- catalysts
- risks
- valuation_view
- horizon
- invalidation_conditions
- disclaimer

De app toont deze output als onderzoekssamenvatting en niet als gegarandeerde koersvoorspelling.