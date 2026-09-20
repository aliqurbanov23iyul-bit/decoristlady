import bcrypt from 'bcryptjs';
import { sql } from '../lib/db.js';
import { tokenFor, cookie, clearCookie } from '../lib/auth.js';

async function ensureAdmin() {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error('ADMIN_PASSWORD environment variable is missing');
  }

  await sql`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;

  const existing = await sql`
    SELECT id, username, password_hash, role
    FROM admins
    WHERE username = ${username}
    LIMIT 1
  `;

  if (existing[0]) return existing[0];

  const hash = await bcrypt.hash(password, 12);
  const created = await sql`
    INSERT INTO admins (username, password_hash, role)
    VALUES (${username}, ${hash}, 'admin')
    RETURNING id, username, password_hash, role
  `;
  return created[0];
}

export default async function handler(req, res) {
  try {
    if (req.method === 'DELETE') {
      res.setHeader('Set-Cookie', clearCookie());
      return res.status(200).json({ ok: true });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { username, password } = req.body || {};
    await ensureAdmin();

    const rows = await sql`
      SELECT id, username, password_hash, role
      FROM admins
      WHERE username = ${username}
      LIMIT 1
    `;

    if (!rows[0] || !(await bcrypt.compare(password || '', rows[0].password_hash))) {
      return res.status(401).json({ error: 'İstifadəçi adı və ya şifrə yanlışdır' });
    }

    const token = await tokenFor(rows[0]);
    res.setHeader('Set-Cookie', cookie(token));
    return res.status(200).json({
      ok: true,
      user: { username: rows[0].username, role: rows[0].role }
    });
  } catch (e) {
    console.error('LOGIN_ERROR:', e);
    return res.status(500).json({
      error: 'Server xətası',
      detail: process.env.NODE_ENV === 'production' ? undefined : String(e?.message || e)
    });
  }
}
