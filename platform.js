/* Local convenience accounts; NOT server authentication or a privacy boundary. */
window.NyanPlatform = (() => {
 const ROOT='sotay-toeic.part5.v1', META='nyan.profiles.v1', SESSION='nyan.local-session.v1';
 const ADMIN_ID='local-owner-admin-v1';
 const loopback=()=>false;
 const fresh=()=>({active:'default',profiles:[{id:'default',name:'Khách'}]});
 const keyFor=id=>id==='default'?ROOT:ROOT+'.profile.'+id;
 const canonical=name=>String(name).trim().toLowerCase();
 const hasName=(p,user)=>!!p.auth&&canonical(p.auth.username)===user;
 const writeAccounts=fn=>globalThis.navigator?.locks?.request?globalThis.navigator.locks.request('nyan.accounts.write.v1',fn):fn();
 function read(){const raw=localStorage.getItem(META);if(!raw)return fresh();const v=JSON.parse(raw);if(!v||!Array.isArray(v.profiles))throw Error('Không đọc được hồ sơ đã lưu. Không ghi đè dữ liệu cũ.');return v;}
 function getActive(){try{const id=sessionStorage.getItem(SESSION);const p=read().profiles.find(p=>p.id===id&&p.auth);if(p&& (p.id!==ADMIN_ID||loopback()))return {id:p.id,name:p.name,role:p.id===ADMIN_ID?'admin':'learner'};}catch{}return {id:'default',name:'Khách'};}
 const active=getActive();
 const bytesToHex=b=>Array.from(b,x=>x.toString(16).padStart(2,'0')).join('');
 const hexToBytes=h=>Uint8Array.from(h.match(/../g)||[],v=>parseInt(v,16));
 function requireCrypto(){if(!globalThis.crypto?.subtle)throw Error('Cần mở website qua localhost hoặc HTTPS để dùng tài khoản.');}
 async function derive(password,salt,iterations){requireCrypto();const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);return bytesToHex(new Uint8Array(await crypto.subtle.deriveBits({name:'PBKDF2',salt:hexToBytes(salt),iterations,hash:'SHA-256'},material,256)));}
 function equal(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let diff=0;for(let i=0;i<a.length;i++)diff|=a.charCodeAt(i)^b.charCodeAt(i);return diff===0;}
 function startSession(id){sessionStorage.setItem(SESSION,id);}
 async function register(username,password,legacyId=''){
  requireCrypto();const name=String(username).trim(),user=canonical(name);
  if(user==='admin')throw Error('Tên Admin được dành riêng.');
  if(['nyantoeic','xenxinhdep'].includes(user)&&legacyId)throw Error('Hồ sơ minh họa không nhận dữ liệu học cũ. Hãy đăng nhập trực tiếp.');
  if(!/^[a-zA-Z0-9_.-]{3,30}$/.test(name))throw Error('Tên đăng nhập cần 3–30 ký tự: chữ không dấu, số, dấu chấm, gạch ngang hoặc gạch dưới.');
  if(typeof password!=='string'||password.length<8||password.length>128)throw Error('Mật khẩu cần 8–128 ký tự.');
  const salt=bytesToHex(crypto.getRandomValues(new Uint8Array(16))),iterations=600000,hash=await derive(password,salt,iterations);
  return writeAccounts(()=>{const v=read();if(v.profiles.some(p=>hasName(p,user)))throw Error('Tên đăng nhập đã tồn tại trên trình duyệt này.');
  let id=crypto.randomUUID();const old=legacyId&&v.profiles.find(p=>p.id===legacyId&&!p.auth);
  if(legacyId&&!old&&legacyId!=='default')throw Error('Hồ sơ cũ không còn khả dụng.');
  if(old&&old.id!=='default')id=old.id;
  const profile={id,name,auth:{username:user,salt,hash,iterations,algorithm:'PBKDF2-SHA256'}};
  // Guest progress can be copied only on explicit request; leave original untouched.
  if(legacyId==='default'){const previous=localStorage.getItem(ROOT);if(previous!==null)localStorage.setItem(keyFor(id),previous);}
  const profiles=v.profiles.filter(p=>p.id!==id);profiles.push(profile);
  localStorage.setItem(META,JSON.stringify({...v,profiles}));startSession(id);});
 }
 async function login(username,password){
  requireCrypto();const user=canonical(username);if(typeof password!=='string'||password.length>128)throw Error('Tên đăng nhập hoặc mật khẩu không đúng.');
  let p=read().profiles.find(p=>hasName(p,user));
  // Shared, local demonstration profile; this verifier is public and grants no server privileges.
  if(!p&&user==='nyantoeic'){
   const demoSalt='a4e7f0b2f9421da7ed749a8cbd563942',demoHash='88453d2d42e81e4fe8aa6eeacf077a7f53ac1687359bcb28dcb132eb597bf0b7';
   if(!equal(await derive(password,demoSalt,600000),demoHash))throw Error('Tên đăng nhập hoặc mật khẩu không đúng.');
   return register('Nyantoeic',password);
  }
  if(!p&&user==='xenxinhdep'){
   // Public local cat-only demo credential; no elevated access.
   const salt='b81a702d0ebae8d47aa9af3e4b86692f',hash='b8bee20fe1dd677e142947edd589fa50c6ea7f15422b14897acb92aeefdf14fb';
   if(!equal(await derive(password,salt,600000),hash))throw Error('Tên đăng nhập hoặc mật khẩu không đúng.');
   return register('xenxinhdep',password);
  }
  const a=p?.auth;
  if(p?.id===ADMIN_ID&&!loopback())throw Error('Quản trị cục bộ chỉ dùng trên localhost.');
  if(!a||a.algorithm!=='PBKDF2-SHA256'||a.iterations!==600000||!/^([0-9a-f]{2}){16}$/.test(a.salt)||!equal(await derive(password,a.salt,a.iterations),a.hash))throw Error('Tên đăng nhập hoặc mật khẩu không đúng.');
  startSession(p.id);
 }
 // Convenience reset, NOT identity verification. Owner excluded.
 async function recoverPassword(username,password){
  requireCrypto();const user=canonical(username);
  if(user==='admin')throw Error('Không hỗ trợ khôi phục Admin bằng tên đăng nhập.');
  if(typeof password!=='string'||password.length<8||password.length>128)throw Error('Mật khẩu mới cần 8–128 ký tự.');
  const matches=v=>v.profiles.filter(p=>hasName(p,user)&&p.id!==ADMIN_ID);
  const found=matches(read());if(found.length!==1)throw Error('Không tìm thấy tài khoản duy nhất trên trình duyệt này.');
  const id=found[0].id,salt=bytesToHex(crypto.getRandomValues(new Uint8Array(16))),iterations=600000,hash=await derive(password,salt,iterations);
  return writeAccounts(()=>{const v=read(),rows=matches(v);if(rows.length!==1||rows[0].id!==id)throw Error('Tài khoản vừa thay đổi. Vui lòng thử lại.');
   const p=rows[0];p.auth={...p.auth,salt,hash,iterations,algorithm:'PBKDF2-SHA256'};localStorage.setItem(META,JSON.stringify(v));
   if(sessionStorage.getItem(SESSION)===id)sessionStorage.removeItem(SESSION);
  });
 }
 function isAdmin(){return loopback()&&getActive().id===ADMIN_ID;}
 function requireAdmin(){if(!isAdmin())throw Error('Không có quyền quản trị cục bộ.');}
 function listAccounts(){requireAdmin();return read().profiles.filter(p=>p.auth).map(p=>{
  let data={};let unreadable=false;try{data=JSON.parse(localStorage.getItem(keyFor(p.id))||'{}')||{};}catch{unreadable=true;}
  return {id:p.id,name:p.name,username:p.auth.username,role:p.id===ADMIN_ID?'admin':'learner',initialPassword:!!p.initialPassword,attempts:Object.keys(data.attempts||{}).length,history:Array.isArray(data.history)?data.history.length:0,reports:Object.keys(data.reports||{}).length,saved:Object.keys(data.saved||{}).length,unreadable};
 });}
 async function resetPassword(id,password){requireAdmin();requireCrypto();if(typeof password!=='string'||password.length<8||password.length>128)throw Error('Mật khẩu mới cần 8–128 ký tự.');
  const salt=bytesToHex(crypto.getRandomValues(new Uint8Array(16))),iterations=600000,hash=await derive(password,salt,iterations);
  requireAdmin();const v=read(),p=v.profiles.find(p=>p.id===id&&p.auth);if(!p)throw Error('Không tìm thấy tài khoản.');
  p.auth={...p.auth,salt,hash,iterations,algorithm:'PBKDF2-SHA256'};delete p.initialPassword;localStorage.setItem(META,JSON.stringify(v));
 }
 return {isAdmin,listAccounts,resetPassword,active:()=>active,key:()=>keyFor(active.id),themeKey:()=>active.id==='default'?'nyan-toeic.theme.v1':'nyan-toeic.theme.v1.'+active.id,
  legacyProfiles(){try{return read().profiles.filter(p=>p.id!=='default'&&!p.auth).map(({id,name})=>({id,name}));}catch{return[];}},
  register,login,recoverPassword,logout(){sessionStorage.removeItem(SESSION);},
  storage:{load(k){return JSON.parse(localStorage.getItem(k)||'{}');},save(k,v){localStorage.setItem(k,JSON.stringify(v));}},
  capabilities(){return {auth:'local-account',sync:false,ai:false,billing:false,plan:'free',learningFeatures:'all'};}
 };
})();
