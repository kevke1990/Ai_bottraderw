import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
dotenv.config();

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||3000);
const publicDir=path.join(__dirname,'public');

const stocks=[
 {ticker:'NVDA',name:'NVIDIA',exchange:'NASDAQ',price:174.15,change:2.81,sector:'Semiconductors'},
 {ticker:'MSFT',name:'Microsoft',exchange:'NASDAQ',price:506.20,change:.72,sector:'Software'},
 {ticker:'AAPL',name:'Apple',exchange:'NASDAQ',price:229.60,change:1.42,sector:'Consumer Electronics'},
 {ticker:'GOOGL',name:'Alphabet',exchange:'NASDAQ',price:214.18,change:1.03,sector:'Internet'},
 {ticker:'AMZN',name:'Amazon',exchange:'NASDAQ',price:231.45,change:-.35,sector:'Internet Retail'},
 {ticker:'AVGO',name:'Broadcom',exchange:'NASDAQ',price:295.40,change:1.88,sector:'Semiconductors'},
 {ticker:'ASML',name:'ASML Holding',exchange:'AMS',price:672.40,change:.91,sector:'Semiconductor Equipment'},
 {ticker:'SAP',name:'SAP',exchange:'XETRA',price:276.10,change:-.24,sector:'Software'},
 {ticker:'NOVO-B',name:'Novo Nordisk',exchange:'CPH',price:365.20,change:1.71,sector:'Pharmaceuticals'},
 {ticker:'NESN',name:'Nestlé',exchange:'SIX',price:79.30,change:.38,sector:'Consumer Staples'},
 {ticker:'MC',name:'LVMH',exchange:'EURONEXT',price:483.80,change:-.66,sector:'Luxury Goods'},
 {ticker:'JPM',name:'JPMorgan Chase',exchange:'NYSE',price:302.40,change:.62,sector:'Banks'}
];

const json=(res,status,data)=>{res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(data));};
async function body(req){let s='';for await(const c of req)s+=c;return s?JSON.parse(s):{};}
function provider(){return process.env.AI_PROVIDER||'openai';}
function researchPrompt(stock){return `You are an equity research analyst. Analyze this stock using only the supplied facts and clearly separate facts from inference. Return valid JSON only with keys: score, signal, confidence, horizon, technical_summary, fundamental_summary, sentiment_summary, catalysts, risks, valuation_view, invalidation_conditions, disclaimer. Signal must be STRONG_BUY, BUY, HOLD, SELL or STRONG_SELL. Do not invent financial metrics or news. Stock: ${JSON.stringify(stock)}`;}

async function analyze(stock){
 const p=provider(), prompt=researchPrompt(stock);
 if(p==='openai'){
  if(!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY ontbreekt');
  const r=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'content-type':'application/json','authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-5.6',input:prompt})});
  const d=await r.json(); if(!r.ok) throw new Error(d.error?.message||'OpenAI API error'); return {provider:p,model:process.env.OPENAI_MODEL||'gpt-5.6',text:d.output_text||JSON.stringify(d)};
 }
 if(p==='anthropic'){
  if(!process.env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY ontbreekt');
  const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-sonnet-4-5',max_tokens:1800,messages:[{role:'user',content:prompt}]})});
  const d=await r.json(); if(!r.ok) throw new Error(d.error?.message||'Anthropic API error'); return {provider:p,model:process.env.ANTHROPIC_MODEL||'claude-sonnet-4-5',text:d.content?.map(x=>x.text||'').join('')||JSON.stringify(d)};
 }
 if(p==='google'){
  if(!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY ontbreekt');
  const model=process.env.GEMINI_MODEL||'gemini-2.5-flash';
  const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
  const d=await r.json(); if(!r.ok) throw new Error(d.error?.message||'Gemini API error'); return {provider:p,model,text:d.candidates?.[0]?.content?.parts?.map(x=>x.text||'').join('')||JSON.stringify(d)};
 }
 throw new Error(`Onbekende AI provider: ${p}`);
}

const server=http.createServer(async(req,res)=>{
 try{
  const u=new URL(req.url,`http://${req.headers.host}`);
  if(u.pathname==='/api/stocks') return json(res,200,stocks);
  if(u.pathname==='/api/config') return json(res,200,{provider:provider(),configured:Boolean(process.env.OPENAI_API_KEY||process.env.ANTHROPIC_API_KEY||process.env.GEMINI_API_KEY)});
  if(u.pathname==='/api/analyze'&&req.method==='POST'){
   const b=await body(req); const stock=stocks.find(s=>s.ticker===b.ticker)||b.stock;
   if(!stock)return json(res,400,{error:'Onbekend aandeel'});
   try{return json(res,200,await analyze(stock));}catch(e){return json(res,502,{error:e.message});}
  }
  let file=u.pathname==='/'?'/index.html':u.pathname; const fp=path.join(publicDir,path.normalize(file));
  if(!fp.startsWith(publicDir)){res.writeHead(403);return res.end();}
  const ext=path.extname(fp), types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
  fs.readFile(fp,(e,data)=>e?(res.writeHead(404),res.end('Not found')):(res.writeHead(200,{'content-type':types[ext]||'text/plain'}),res.end(data)));
 }catch(e){json(res,500,{error:e.message});}
});
server.listen(port,()=>console.log(`AI BotTrader: http://localhost:${port}`));