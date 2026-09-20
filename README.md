# Decorist Lady v2

Bu versiyada `public/` qovluğu yoxdur. HTML faylları layihənin kökündədir və Vercel birbaşa serve edir.

## Fayllar
- `index.html` — Ana səhifə
- `decorlar.html` — portfolio və kateqoriya filtrləri
- `xidmetler.html` — xidmətlər
- `haqqimizda.html` — brend səhifəsi
- `elaqe.html` — rezervasiya formu
- `admin.html` — admin panel
- `assets/` — CSS və JS
- `api/` — Vercel serverless API
- `schema.sql` — Neon DB strukturu

## Neon
Neon SQL Editor-də `schema.sql` faylını çalışdır.

İlk admin üçün bcrypt hash yarat və admins cədvəlinə əlavə et. Lokal olaraq:
`node -e "import('bcryptjs').then(async b=>console.log(await b.default.hash('SIFREN',12)))"`
Sonra SQL:
`INSERT INTO admins(username,password_hash,role) VALUES ('admin','HASH_BURAYA','admin');`

## Vercel Environment Variables
- `DATABASE_URL` — Neon connection string
- `JWT_SECRET` — uzun random gizli açar

## Admin
Deploy-dan sonra `/admin` və ya `/admin.html`.

## Şəkillər
Demo mərhələsində bir neçə Unsplash şəkli URL ilə istifadə olunur. Real Decorist Lady fotolarını admin paneldə dekor kartlarının `Şəkil URL` sahəsindən dəyişmək olar. Prod üçün Cloudinary və ya Vercel Blob upload inteqrasiyası tövsiyə olunur.

## Təhlükəsizlik
Admin sessiyası HttpOnly + Secure + SameSite cookie ilə saxlanılır. Admin API-ləri server tərəfində JWT yoxlayır. Parollar plaintext saxlanmır; bcrypt hash istifadə olunur.
