const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const FALLBACK={site_name:'Decorist Lady',hero_title:'Xüsusi günlərinizi unudulmaz edək',hero_text:'Hər detalda sevgi, hər tədbirdə zövq.',phone:'+994 50 123 45 67',whatsapp:'994501234567',instagram:'decorist_lady',email:'',address:'Bakı, Azərbaycan',hours:'Hər gün 09:00 — 20:00',footer_text:'${c?.footer_text||FALLBACK.footer_text}',copyright_text:'${c?.copyright_text||FALLBACK.copyright_text}'};

const ICONS={
  instagram:`<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  whatsapp:`<svg class="icon-svg" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`,
  phone:`<svg class="icon-svg" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
  mapPin:`<svg class="icon-svg" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  clock:`<svg class="icon-svg" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>`
};

async function api(u,o={}){const r=await fetch(u,{headers:{'Content-Type':'application/json',...(o.headers||{})},...o});if(!r.ok)throw new Error((await r.json().catch(()=>({}))).error||'Xəta');return r.json()}
async function content(){try{return {...FALLBACK,...await api('/api/content')}}catch{return FALLBACK}}

function nav(c){
  const cleanWa=(c?.whatsapp||FALLBACK.whatsapp).replace(/\D/g,'');
  const phone=c?.phone||FALLBACK.phone;
  const ig=c?.instagram||FALLBACK.instagram;
  return `<div class="topbar">
    <div class="topbar-msg">✨ Xüsusi günlər üçün fərdi dekor həlləri • Görüş üçün rezervasiya edin</div>
    <div class="topbar-socials">
      <a class="topbar-link brand-phone" href="tel:${phone}" title="Zəng edin">${ICONS.phone} <span>${phone}</span></a>
      <a class="topbar-link brand-wa" href="https://wa.me/${cleanWa}" target="_blank" rel="noopener" title="WhatsApp">${ICONS.whatsapp} <span>WhatsApp</span></a>
      <a class="topbar-link brand-ig" href="https://instagram.com/${ig}" target="_blank" rel="noopener" title="Instagram">${ICONS.instagram} <span>@${ig}</span></a>
    </div>
  </div>
  <nav class="nav">
    <div class="container navin">
      <a class="logo" href="index.html">${c?.site_name||FALLBACK.site_name} <i>♡</i></a>
      <div class="links">
        <a href="index.html">Ana səhifə</a>
        <a href="decorlar.html">Dekorlar</a>
        <a href="xidmetler.html">Xidmətlər</a>
        <a href="haqqimizda.html">Haqqımızda</a>
        <a href="elaqe.html">Əlaqə</a>
      </div>
      <div class="nav-socials">
        <a class="nav-social-btn brand-wa" href="https://wa.me/${cleanWa}" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp ilə yazın">${ICONS.whatsapp}</a>
        <a class="nav-social-btn brand-ig" href="https://instagram.com/${ig}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram profilimiz">${ICONS.instagram}</a>
        <a class="nav-social-btn brand-phone" href="tel:${phone}" aria-label="Zəng edin" title="İndi zəng edin">${ICONS.phone}</a>
      </div>
      <a class="navbtn" href="elaqe.html">Görüş rezerv et →</a>
      <button class="menu" aria-label="Menyu">☰</button>
    </div>
  </nav>`;
}

function footer(c){
  const cleanWa=(c?.whatsapp||FALLBACK.whatsapp).replace(/\D/g,'');
  const phone=c?.phone||FALLBACK.phone;
  const ig=c?.instagram||FALLBACK.instagram;
  const addr=c?.address||FALLBACK.address;
  return `<footer class="footer">
    <div class="container">
      <div class="footgrid">
        <div class="footer-brand">
          <div class="logo" style="color:#ffffff">${c?.site_name||FALLBACK.site_name} <i>♡</i></div>
          <p style="color:#b8c7c1;max-width:340px;line-height:1.65;margin:14px 0 20px;font-size:14px">Xüsusi günlərinizi zövqlü və yaddaqalan detallarla tamamlayırıq.</p>
          <div class="footer-socials">
            <a class="footer-social-btn brand-ig" href="https://instagram.com/${ig}" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram: @${ig}">${ICONS.instagram}</a>
            <a class="footer-social-btn brand-wa" href="https://wa.me/${cleanWa}" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp ilə yazın">${ICONS.whatsapp}</a>
            <a class="footer-social-btn brand-phone" href="tel:${phone}" aria-label="Telefon" title="Zəng edin: ${phone}">${ICONS.phone}</a>
          </div>
        </div>
        <div class="footer-col">
          <b class="footer-col-title">Sürətli keçidlər</b>
          <div class="footer-links-list">
            <a href="decorlar.html">Dekorlar</a>
            <a href="xidmetler.html">Xidmətlər</a>
            <a href="haqqimizda.html">Haqqımızda</a>
            <a href="elaqe.html">Görüş rezervasiyası</a>
          </div>
        </div>
        <div class="footer-col">
          <b class="footer-col-title">Bizimlə əlaqə</b>
          <div class="footer-contact-list">
            <a class="footer-contact-item brand-phone" href="tel:${phone}">
              <span class="footer-contact-icon">${ICONS.phone}</span>
              <span class="footer-contact-text">
                <small>Zəng üçün:</small>
                <b>${phone}</b>
              </span>
            </a>
            <a class="footer-contact-item brand-wa" href="https://wa.me/${cleanWa}" target="_blank" rel="noopener">
              <span class="footer-contact-icon">${ICONS.whatsapp}</span>
              <span class="footer-contact-text">
                <small>Sürətli çat:</small>
                <b>WhatsApp ilə yazın</b>
              </span>
            </a>
            <a class="footer-contact-item brand-ig" href="https://instagram.com/${ig}" target="_blank" rel="noopener">
              <span class="footer-contact-icon">${ICONS.instagram}</span>
              <span class="footer-contact-text">
                <small>Instagram:</small>
                <b>@${ig}</b>
              </span>
            </a>
            <div class="footer-contact-item static-item">
              <span class="footer-contact-icon pin-icon">${ICONS.mapPin}</span>
              <span class="footer-contact-text">
                <small>Ünvan:</small>
                <b>${addr}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">© 2026 Decorist Lady. Bütün hüquqlar qorunur.</div>
    </div>
  </footer>`;
}

function injectFloatingDock(c){
  if($('#floating-dock'))return;
  const cleanWa=(c?.whatsapp||FALLBACK.whatsapp).replace(/\D/g,'');
  const phone=c?.phone||FALLBACK.phone;
  const ig=c?.instagram||FALLBACK.instagram;
  const dock=document.createElement('aside');
  dock.id='floating-dock';
  dock.className='floating-dock';
  dock.setAttribute('aria-label','Sürətli Əlaqə');
  dock.innerHTML=`
    <a class="floating-btn brand-wa floating-wa-primary" href="https://wa.me/${cleanWa}" target="_blank" rel="noopener" aria-label="WhatsApp ilə yazın">
      <span class="floating-tooltip">WhatsApp ilə yazın</span>
      ${ICONS.whatsapp}
    </a>
    <a class="floating-btn brand-ig" href="https://instagram.com/${ig}" target="_blank" rel="noopener" aria-label="Instagram profilimiz">
      <span class="floating-tooltip">Instagram: @${ig}</span>
      ${ICONS.instagram}
    </a>
    <a class="floating-btn brand-phone" href="tel:${phone}" aria-label="Zəng edin">
      <span class="floating-tooltip">Zəng: ${phone}</span>
      ${ICONS.phone}
    </a>
  `;
  document.body.appendChild(dock);
}

async function boot(){
  const c=await content();
  if($('#site-nav'))$('#site-nav').innerHTML=nav(c);
  if($('#site-footer'))$('#site-footer').innerHTML=footer(c);
  injectFloatingDock(c);
  $('.menu')?.addEventListener('click',()=>$('.nav').classList.toggle('open'));
  $$('[data-content]').forEach(e=>{if(c[e.dataset.content])e.textContent=c[e.dataset.content]});
  $$('[data-phone]').forEach(e=>{
    e.textContent=c.phone;
    if(e.tagName==='A')e.href=`tel:${c.phone}`;
  });
  const cleanWa=(c.whatsapp||FALLBACK.whatsapp).replace(/\D/g,'');
  $$('[data-whatsapp]').forEach(e=>{
    if(e.tagName==='A')e.href=`https://wa.me/${cleanWa}`;
  });
  $$('[data-instagram]').forEach(e=>{
    if(e.tagName==='A')e.href=`https://instagram.com/${c.instagram||FALLBACK.instagram}`;
  });
  $$('#hero-wa, #cta-wa, #contact-wa').forEach(el=>{el.href=`https://wa.me/${cleanWa}`});
  $$('#hero-ig, #contact-ig').forEach(el=>{el.href=`https://instagram.com/${c.instagram||FALLBACK.instagram}`});
  $$('#hero-phone, #cta-phone, #contact-phone').forEach(el=>{el.href=`tel:${c.phone||FALLBACK.phone}`});
  if(c.seo_title)document.title=c.seo_title;let md=document.querySelector('meta[name="description"]');if(c.seo_description){if(!md){md=document.createElement('meta');md.name='description';document.head.appendChild(md)}md.content=c.seo_description}return c;
}

window.DL={api,boot,content,ICONS};
