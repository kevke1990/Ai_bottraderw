# AI providers koppelen

AI BotTrader ondersteunt OpenAI/ChatGPT, Anthropic/Claude en Google Gemini. De browser kent geen API keys: alle calls lopen via de server.

## OpenAI / ChatGPT
```env
AI_PROVIDER=openai
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-5
```
De server gebruikt de OpenAI Responses API.

## Claude / Anthropic
```env
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=...
ANTHROPIC_MODEL=claude-sonnet-4-5
```
De server gebruikt de Anthropic Messages API.

## Gemini / Google
```env
AI_PROVIDER=google
GEMINI_API_KEY=...
GEMINI_MODEL=gemini-2.5-flash
```
De server gebruikt Gemini `generateContent`.

## Multi-AI Council
Voor alle drie tegelijk:
```env
AI_COUNCIL=openai,anthropic,google
```
De server voert de geconfigureerde providers parallel uit. Providers zonder key geven een fout terug, terwijl beschikbare providers wel resultaten leveren.

## Provider wisselen
Verander `AI_PROVIDER` en herstart de server. Je hoeft de frontend niet te wijzigen.

## Beveiliging
- Zet echte keys alleen in `.env` of TrueNAS secret/environment settings.
- Commit nooit `.env`.
- Zet keys nooit in HTML, JavaScript of localStorage.
- Gebruik HTTPS en authenticatie als de app buiten je LAN bereikbaar is.

## Modelnamen
Modelnamen veranderen. Gebruik daarom een modelnaam die op het moment van configuratie door jouw provider/account wordt aangeboden. De waarden in `.env.example` zijn voorbeelden.

## AI research schema
De backend vraagt om een gestructureerd resultaat met score, signal, confidence, horizon, thesis, bull case, bear case, catalysts, risks en invalidation conditions. In een productieversie moet JSON strikt worden gevalideerd voordat scores in rankings, alerts of paper-tradingregels worden gebruikt.
