import {sql} from '../lib/db.js';
import {requireAdmin} from '../lib/auth.js';

async function ensureTable(){
  await sql`CREATE TABLE IF NOT EXISTS instagram_reels (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL DEFAULT '',
    url TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
}
function cleanInstagramUrl(value=''){
  try{
    const u=new URL(String(value).trim());
    if(!/(^|\.)instagram\.com$/i.test(u.hostname)) throw new Error();
    const m=u.pathname.match(/^\/(reel|p|tv)\/([^/]+)/i);
    if(!m) throw new Error();
    return `https://www.instagram.com/${m[1].toLowerCase()}/${m[2]}/`;
  }catch{throw new Error('Düzgün Instagram Reel/Post linki daxil edin');}
}
export default async function(req,res){
  try{
    await ensureTable();
    if(req.method==='GET'){
      const all=req.query?.all==='1';
      const rows=all
        ? await sql`SELECT * FROM instagram_reels ORDER BY sort_order,id DESC`
        : await sql`SELECT * FROM instagram_reels WHERE active=true ORDER BY sort_order,id DESC`;
      return res.json(rows);
    }
    await requireAdmin(req);
    const b=req.body||{};
    if(req.method==='POST'){
      const url=cleanInstagramUrl(b.url);
      const r=await sql`INSERT INTO instagram_reels(title,url,active,sort_order) VALUES(${String(b.title||'')},${url},${b.active!==false},${+b.sort_order||0}) RETURNING *`;
      return res.json(r[0]);
    }
    if(req.method==='PUT'){
      const url=cleanInstagramUrl(b.url);
      const r=await sql`UPDATE instagram_reels SET title=${String(b.title||'')},url=${url},active=${b.active!==false},sort_order=${+b.sort_order||0} WHERE id=${+b.id} RETURNING *`;
      return res.json(r[0]);
    }
    if(req.method==='DELETE'){
      await sql`DELETE FROM instagram_reels WHERE id=${+req.query.id}`;
      return res.json({ok:true});
    }
    return res.status(405).end();
  }catch(e){
    return res.status(e.message==='UNAUTHORIZED'?401:400).json({error:e.message});
  }
}