import {sql} from '../lib/db.js';
import {requireAdmin} from '../lib/auth.js';

async function ensureTable(){
  await sql`CREATE TABLE IF NOT EXISTS site_content (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT ''
  )`;
  const defaults={
    hero_title:'Xüsusi günlərinizi unudulmaz edək',
    hero_text:'Hər detalda sevgi, hər tədbirdə zövq. Xəyallarınızdakı atmosferi birlikdə yaradaq.',
    phone:'+994 50 123 45 67',
    whatsapp:'994501234567',
    instagram:'decorist_lady',
    email:'',
    address:'Bakı, Azərbaycan',
    hours:'Hər gün 09:00 — 20:00',
    about_title:'Unudulmaz anlar üçün',
    about_text:'Decorist Lady olaraq hər tədbiri unikal bir hekayəyə çeviririk.',
    site_name:'Decorist Lady',
    footer_text:'Xüsusi günlərinizi zövqlü və yaddaqalan detallarla tamamlayırıq.',
    copyright_text:'© 2026 Decorist Lady. Bütün hüquqlar qorunur.',
    seo_title:'Decorist Lady',
    seo_description:''
  };
  for(const [k,v] of Object.entries(defaults)){
    await sql`INSERT INTO site_content(key,value) VALUES(${k},${v}) ON CONFLICT(key) DO NOTHING`;
  }
}

export default async function(req,res){
  try{
    await ensureTable();
    if(req.method==='GET'){
      const rows=await sql`SELECT key,value FROM site_content`;
      return res.json(Object.fromEntries(rows.map(x=>[x.key,x.value])));
    }
    await requireAdmin(req);
    if(req.method==='PUT'){
      for(const [k,v] of Object.entries(req.body||{})){
        await sql`INSERT INTO site_content(key,value) VALUES(${k},${String(v??'')}) ON CONFLICT(key) DO UPDATE SET value=excluded.value`;
      }
      return res.json({ok:true});
    }
    return res.status(405).end();
  }catch(e){
    return res.status(e.message==='UNAUTHORIZED'?401:500).json({error:e.message});
  }
}
