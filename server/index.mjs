import http from 'node:http';
import {randomBytes,scryptSync,timingSafeEqual,createHash} from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {sqlite} from './database.mjs';
import {POST} from './action.mjs';
import {GET} from './data.mjs';
const password=process.env.APP_PASSWORD;
if(!password||password.length<10){console.error('APP_PASSWORD ni .env faylida kamida 10 ta belgidan iborat qilib belgilang.');process.exit(1)}
const salt=randomBytes(16),key=scryptSync(password,salt,32),failures=new Map();
const hash=s=>createHash('sha256').update(s).digest('hex');
const json=(res,status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(obj))};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2'};
const root=path.resolve('dist');
const server=http.createServer(async(req,res)=>{try{res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Referrer-Policy','same-origin');const url=new URL(req.url,'http://localhost');const token=(req.headers.cookie||'').split(';').map(x=>x.trim()).find(x=>x.startsWith('korxona_session='))?.split('=')[1];const session=token&&sqlite.prepare('SELECT expires FROM app_sessions WHERE token=?').get(hash(token));const authenticated=!!session&&session.expires>Date.now();
if(url.pathname==='/api/session')return json(res,200,{authenticated});
if(url.pathname.startsWith('/api/')){const origin=req.headers.origin;if(origin&&new URL(origin).host!==req.headers.host)return json(res,403,{error:'Ruxsat yo‘q'});if(!['GET','POST'].includes(req.method))return json(res,405,{error:'Amal mumkin emas'});let body='';if(req.method==='POST'){for await(const chunk of req){body+=chunk;if(body.length>100000)return json(res,413,{error:'Ma’lumot juda katta'})}}
if(url.pathname==='/api/login'&&req.method==='POST'){const address=req.socket.remoteAddress||'local';const prev=failures.get(address);if(prev&&prev.count>=8&&prev.until>Date.now())return json(res,429,{error:'Ko‘p noto‘g‘ri urinish. 10 daqiqadan keyin urinib ko‘ring.'});let input;try{input=JSON.parse(body).password}catch{return json(res,400,{error:'Parolni kiriting'})}if(typeof input!=='string'||input.length>200||!timingSafeEqual(scryptSync(input,salt,32),key)){const next=prev&&prev.until>Date.now()?prev:{count:0,until:Date.now()+600000};next.count++;failures.set(address,next);return json(res,401,{error:'Parol noto‘g‘ri'})}failures.delete(address);sqlite.prepare('DELETE FROM app_sessions WHERE expires < ?').run(Date.now());const t=randomBytes(32).toString('hex');sqlite.prepare('INSERT INTO app_sessions(token,expires) VALUES(?,?)').run(hash(t),Date.now()+43200000);res.setHeader('Set-Cookie',`korxona_session=${t}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200${process.env.COOKIE_SECURE==='true'?'; Secure':''}`);return json(res,200,{ok:true})}
if(!authenticated)return json(res,401,{error:'Hisobingizga kiring'});
if(url.pathname==='/api/logout'&&req.method==='POST'){sqlite.prepare('DELETE FROM app_sessions WHERE token=?').run(hash(token));res.setHeader('Set-Cookie','korxona_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');return json(res,200,{ok:true})}
const request=new Request('http://localhost'+req.url,{method:req.method,headers:{'Content-Type':'application/json','oai-authenticated-user-id':'owner'},...(req.method==='POST'?{body}:{})});const result=url.pathname==='/api/data'&&req.method==='GET'?await GET(request):url.pathname==='/api/action'&&req.method==='POST'?await POST(request):null;if(!result)return json(res,404,{error:'Amal topilmadi'});res.writeHead(result.status,Object.fromEntries(result.headers));res.end(await result.text());return}
let target=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(!target.startsWith(root+path.sep)&&target!==root)return json(res,403,{error:'Ruxsat yo‘q'});if(!fs.existsSync(target)||fs.statSync(target).isDirectory())target=path.join(root,'index.html');if(!fs.existsSync(target))return json(res,503,{error:'Avval npm run build buyrug‘ini bajaring'});res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':path.basename(target)==='index.html'?'no-cache':'public,max-age=3600'});fs.createReadStream(target).pipe(res);
}catch(e){console.error(e);if(!res.headersSent)json(res,500,{error:'Serverda xato. Qayta urinib ko‘ring.'});else res.end()}});
server.listen(Number(process.env.PORT||3000),'0.0.0.0',()=>console.log('Korxona360°: http://localhost:'+Number(process.env.PORT||3000)));
