import {DatabaseSync} from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
const directory=path.resolve(process.env.DATA_DIR||'./data');fs.mkdirSync(directory,{recursive:true});
export const sqlite=new DatabaseSync(path.join(directory,'korxona360.sqlite'));
sqlite.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
sqlite.exec('CREATE TABLE IF NOT EXISTS app_migrations (name TEXT PRIMARY KEY);CREATE TABLE IF NOT EXISTS app_sessions (token TEXT PRIMARY KEY,expires INTEGER NOT NULL);');
for(const name of fs.readdirSync('./drizzle').filter(n=>n.endsWith('.sql')).sort()){if(sqlite.prepare('SELECT name FROM app_migrations WHERE name=?').get(name))continue;sqlite.exec('BEGIN IMMEDIATE');try{sqlite.exec(fs.readFileSync('./drizzle/'+name,'utf8'));sqlite.prepare('INSERT INTO app_migrations(name) VALUES(?)').run(name);sqlite.exec('COMMIT')}catch(e){sqlite.exec('ROLLBACK');throw e}}
class Prepared{constructor(sql,args=[]){this.sql=sql;this.args=args}bind(...args){return new Prepared(this.sql,args)}async first(){return sqlite.prepare(this.sql).get(...this.args)||null}}
const adapter={prepare:sql=>new Prepared(sql),async batch(statements){sqlite.exec('BEGIN IMMEDIATE');try{const rows=statements.map(s=>{const st=sqlite.prepare(s.sql);return /^\s*SELECT/i.test(s.sql)?{results:st.all(...s.args)}:{success:true,meta:st.run(...s.args)}});sqlite.exec('COMMIT');return rows}catch(e){sqlite.exec('ROLLBACK');throw e}}};
export function db(){return adapter}
