import {requireAdmin} from '../lib/auth.js'; export default async function(req,res){try{res.json({user:await requireAdmin(req)})}catch{res.status(401).json({error:'unauthorized'})}}
