import { jwtVerify, SignJWT } from 'jose';
const key=()=>new TextEncoder().encode(process.env.JWT_SECRET||'change-me');
export async function tokenFor(user){return new SignJWT({sub:String(user.id),role:user.role,username:user.username}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('12h').sign(key())}
export async function requireAdmin(req){const cookie=req.headers.cookie||'';const token=cookie.match(/(?:^|; )dl_session=([^;]+)/)?.[1];if(!token) throw new Error('UNAUTHORIZED');return (await jwtVerify(token,key())).payload}
export function cookie(token){return `dl_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=43200`}
export function clearCookie(){return 'dl_session=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'}
