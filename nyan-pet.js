/* V7.6 – shared active-time visits; original breed-inspired vector pets. */
(() => {
  'use strict';
  if(typeof document==='undefined'||typeof matchMedia!=='function')return;
  const VISIT_EVERY=360000,VISIT_LENGTH=300000,EXIT_MS=2400,ROLL_MS=380,MAX_CATS=50;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  let elapsed=0,last=performance.now(),blockedBefore=true,round=-1,groupSize=1,visiting=false,serial=0;
  const cats=new Set();
  const controlsKey=window.NyanPlatform.themeKey().replace('theme','pets.controls');
  let prefs={size:'auto',eco:false,count:1};try{const p=JSON.parse(localStorage.getItem(controlsKey)||'{}');if(['auto','small','medium','large'].includes(p.size))prefs.size=p.size;prefs.eco=p.eco===true;if(Number.isInteger(p.count))prefs.count=clamp(p.count,0,MAX_CATS);}catch{}groupSize=prefs.count;
  function persist(){prefs.count=groupSize;try{localStorage.setItem(controlsKey,JSON.stringify(prefs));}catch{}}
  function ecoMode(){return prefs.eco||groupSize>=25;}
  const sleepKey=window.NyanPlatform.themeKey().replace("theme","pets.sleep");
  let sleeping=false;try{sleeping=localStorage.getItem(sleepKey)==='1';}catch{}
  const toggle=document.querySelector("#pet-toggle");
  const control=document.createElement('section');control.className='nyan-cat-controls';control.setAttribute('aria-label','Điều khiển mèo');control.innerHTML='<button type="button" class="outline nyan-cat-launch" aria-expanded="false" aria-controls="nyan-cat-panel">🐾 Mèo <span data-cat-count></span></button><div id="nyan-cat-panel" class="nyan-cat-panel" hidden><div class="nyan-cat-heading"><b>Điều khiển mèo</b><button type="button" class="outline" data-cat-act="close" aria-label="Đóng điều khiển mèo">×</button></div><label for="nyan-cat-range">Số mèo gọi <output data-cat-preview></output> / 50</label><input type="range" id="nyan-cat-range" min="0" max="50" step="1" value="1"><div class="nyan-cat-buttons"><button type="button" class="outline" data-cat-delta="-1">−1</button><button type="button" class="outline" data-cat-delta="1">+1</button><button type="button" class="outline" data-cat-delta="5">+5</button><button type="button" class="outline" data-cat-delta="10">+10</button></div><div class="nyan-cat-buttons two"><button type="button" class="btn" data-cat-act="all">Gọi đủ 50</button><button type="button" class="outline" data-cat-act="sleep">Cho mèo ngủ</button><button type="button" class="outline" data-cat-act="zero">Thu hết mèo</button></div><label>Kích thước <select data-cat-size><option value="auto">Tự động</option><option value="small">Nhỏ</option><option value="medium">Vừa</option><option value="large">Lớn</option></select></label><label class="nyan-cat-eco"><input type="checkbox" data-cat-eco> Tiết kiệm hiệu năng</label><small data-cat-status></small><small>Chạm để xem lời động viên; giữ để vuốt ve, kéo để nhấc, nút × để mèo nghỉ. 5 phút đi chơi · 1 phút nghỉ.</small></div>';document.body.append(control);
  const launch=control.querySelector('.nyan-cat-launch'),panel=control.querySelector('.nyan-cat-panel'),range=control.querySelector('input[type=range]');
  let sliding=false;
  const setText=(el,s)=>{if(el.textContent!==s)el.textContent=s;};
  const layer=document.createElement("div");layer.className="nyan-pet-layer";document.body.append(layer);
  function applyPetPrefs(){layer.dataset.size=prefs.size;layer.classList.toggle('nyan-pet-eco',ecoMode());layer.classList.toggle('nyan-pet-crowd',groupSize>=20);}
  // Prefer unique unlocked coats until the pool is exhausted.
  const coats=[
    {id:'black',name:'Mèo đen',fur:'#484953',body:'#3b3d46',leg:'#444650',tail:'#50515a',belly:'#76757d',mark:'#656570',ink:'#20232b',face:'#f0d89a'},
    {id:'gold',name:'Mèo vàng',fur:'#f5bc75',body:'#e9a65e',leg:'#eeb16b',tail:'#df9751',belly:'#ffe2b1',mark:'#c47b3e',ink:'#65442f',face:'#51382c'},
    {id:'tabby',name:'Mèo mướp',fur:'#b9ada0',body:'#a69a8d',leg:'#aa9d8e',tail:'#9b8d7e',belly:'#e8ded0',mark:'#67594c',ink:'#51483f',face:'#3d3934'},
    {id:'calico',name:'Mèo tam thể',fur:'#fff2dd',body:'#f5e8d8',leg:'#e7a969',tail:'#b07850',belly:'#fff5e7',mark:'#e2a166',ink:'#453e3b',face:'#453e3b'},
    {id:'white',name:'Mèo trắng',fur:'#fffdf7',body:'#f4f2ed',leg:'#e6e5e1',tail:'#e5e4e0',belly:'#fffdfa',mark:'#d9d6cf',ink:'#52615a',face:'#304b3b'},
    {id:'siamese',name:'Mèo Xiêm',fur:'#f6dfbf',body:'#e8d0af',leg:'#805e51',tail:'#765344',belly:'#fff0d5',mark:'#8a6556',ink:'#553e36',face:'#3974a0',pattern:'point'},
    {id:'british',name:'Mèo Anh lông ngắn',fur:'#a8aebb',body:'#929ba9',leg:'#9099a7',tail:'#8993a3',belly:'#c3cbd5',mark:'#838d9d',ink:'#434d60',face:'#855322'},
    {id:'russian',name:'Mèo Nga xanh',fur:'#9cabb4',body:'#8798a6',leg:'#81939f',tail:'#7e919f',belly:'#c0cbd2',mark:'#788e9b',ink:'#425565',face:'#34734a'},
    {id:'bengal',name:'Mèo Bengal',fur:'#e9b67d',body:'#dba36b',leg:'#d49c65',tail:'#be8654',belly:'#ffe2b5',mark:'#84512f',ink:'#60432f',face:'#3e582d',pattern:'spots'},
    {id:'ragdoll',name:'Mèo Ragdoll',fur:'#f7eee5',body:'#e9ded5',leg:'#c2ad9f',tail:'#a98e80',belly:'#fff6ed',mark:'#b5a093',ink:'#63564f',face:'#4b83b7',pattern:'point',fluffy:true},
    {id:'maine',name:'Mèo Maine Coon',fur:'#c8a78b',body:'#b49074',leg:'#ab866b',tail:'#92715c',belly:'#e9d3b9',mark:'#795942',ink:'#5f4638',face:'#526039',fluffy:true,pattern:'stripe'}
  ];
  const usedCoats=new Set();const pickCoat=()=>{const pool=coats.concat(nyanOwnedCats());let fresh=pool.filter(c=>!usedCoats.has(c.id));if(!fresh.length){usedCoats.clear();fresh=pool;}const c=fresh[Math.floor(Math.random()*fresh.length)];usedCoats.add(c.id);return c;};
  const random=(a,b)=>a+Math.random()*(b-a);

  function colorArt(html,c){
    const headMarks=c.pattern==='point'?`<path d="M-31-28-27-11-10-20ZM31-28 27-11 10-20Z" fill="${c.mark}" stroke="none"/><ellipse cx="0" cy="9" rx="22" ry="15" fill="${c.mark}" opacity=".75"/>`:c.pattern==='spots'?`<g fill="${c.mark}" stroke="none"><ellipse cx="-12" cy="-13" rx="3" ry="5"/><ellipse cx="12" cy="-13" rx="3" ry="5"/><circle cx="-23" cy="0" r="3"/><circle cx="23" cy="0" r="3"/></g>`:c.id==='calico'?'<path d="M-29-27-10-18Q-3-12-9-5Q-19 2-30-5Z" fill="#e2a166" stroke="none"/><path d="M30-29 12-18Q8-11 16-5L30-3Z" fill="#45434b" stroke="none"/>':c.id==='tabby'||c.id==='gold'||c.pattern==='stripe'?`<path d="M-12-19-5-11 0-18 5-11 12-19M-30-3l9 4m-11 4 9 3m23-12 9-4m-9 11 10-3" fill="none" stroke="${c.mark}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`:'';
    const bodyMarks=c.pattern==='spots'?`<g fill="none" stroke="${c.mark}" stroke-width="2.8"><ellipse cx="52" cy="69" rx="5" ry="4"/><ellipse cx="67" cy="62" rx="5" ry="4"/><ellipse cx="78" cy="75" rx="5" ry="4"/><ellipse cx="93" cy="66" rx="4" ry="5"/></g>`:c.id==='calico'?'<path d="M43 63Q49 52 64 53L70 61Q74 73 60 79Q47 80 41 70Z" fill="#e2a166" stroke="none"/><path d="M81 53Q96 55 105 65L102 78Q91 83 84 76Z" fill="#45434b" stroke="none"/>':c.id==='tabby'||c.id==='gold'||c.pattern==='stripe'?`<path d="M53 59q8 4 9 11m7-15q7 6 7 13m8-11q6 5 7 10" stroke="${c.mark}" stroke-width="4" stroke-linecap="round" fill="none"/>`:'';
    html=html.replace('<path d="m-26-26',headMarks+'<path d="m-26-26').replace('rx="34" ry="20" fill="#f5e5c8"/>','rx="34" ry="20" fill="#f5e5c8"/>'+bodyMarks);
    if(c.fluffy)html=html.replace('<path d="m-26-26',`<path d="M-29 8l-5 7 7 1-1 7 9-1 3 6 8-3M29 8l5 7-7 1 1 7-9-1-3 6-8-3" stroke="${c.ink}" fill="${c.fur}" stroke-width="2"/><path d="m-26-26`);
    if(c.shape==='fold')html=html.replace('M-29-8-32-29Q-33-35-27-32L-9-21Q0-24 9-21L27-32Q33-35 32-29L29-8','M-29-8Q-38-21-26-22L-9-21Q0-24 9-21L26-22Q38-21 29-8');
    if(c.shape==='short')html=html.replaceAll('v14q5 8 12 0V76','v8q5 8 12 0V76').replaceAll('v14q6 8 13 0V78','v8q6 8 13 0V78');
    if(c.shape==='curl')html=html.replace('M-29-8-32-29Q-33-35-27-32L-9-21Q0-24 9-21L27-32Q33-35 32-29L29-8','M-29-8Q-42-35-26-30L-9-21Q0-24 9-21L26-30Q42-35 29-8');
    if(['bare','rex','tick'].includes(c.shape))html=html.replace('M-29-8-32-29Q-33-35-27-32L-9-21Q0-24 9-21L27-32Q33-35 32-29L29-8','M-29-8-38-37Q-39-42-31-38L-9-21Q0-24 9-21L31-38Q39-42 38-37L29-8');
    if(['van','bob','wolf','bare','rex','waves','tick','fox'].includes(c.shape)){const detail=['van','bob'].includes(c.shape)?`<path d="M-28-25-10-18-18-5-30-8ZM28-25 10-18 18-5 30-8Z" fill="${c.mark}" stroke="none"/>`:c.shape==='wolf'?`<path d="M-29-8Q-14-20 0-7Q14-20 29-8L24 14 0 22-24 14Z" fill="${c.mark}" stroke="none"/>`:`<path d="M-14-15q4-5 8 0t8 0t8 0M-9-9q4-4 8 0t8 0" stroke="${c.mark}" stroke-width="2" fill="none"/>`;html=html.replace('<path d="m-26-26',detail+'<path d="m-26-26');}
    if(c.shape==='bob')html=html.replaceAll('M48 70Q18 78 14 56Q12 43 25 45','M48 70Q32 66 31 59');
    if(c.shape==='odd')html=html.replace(/(<ellipse cx="13" cy="2"[^>]+fill=")#304b3b/g,'$1#c5a13e');
    // Face contrast is independent from the outline (important for black coat).
    html=html.replace(/(<path d="m-3 10[^>]+stroke=")#304b3b/g,'$1'+c.face).replace(/(<ellipse cx="(?:-13|13)" cy="2"[^>]+fill=")#304b3b/g,'$1'+c.face).replace(/(<path d="M-20 4[^>]+stroke=")#304b3b/g,'$1'+c.face);
    const colors={'#fff0d6':c.fur,'#f5e5c8':c.body,'#e9d7bb':c.leg,'#e8d4b5':c.tail,'#ead7b9':c.tail,'#fff4df':c.belly,'#d6bfa4':c.mark,'#304b3b':c.ink};
    return html.replace(/#(?:fff0d6|f5e5c8|e9d7bb|e8d4b5|ead7b9|fff4df|d6bfa4|304b3b)\b/g,m=>colors[m]);
  }
  function controlBlocked(){return document.documentElement.classList.contains('ui91-focus')||document.documentElement.classList.contains('ui91-quiet')||document.hidden||!!document.querySelector('.exam-grid,[data-v9-blind],dialog[open]')||/^#(?:profiles|admin)(?:\/|$)/.test(location.hash)||!!document.querySelector('#sidebar')?.classList.contains('open');}
  function blocked(){return sleeping||controlBlocked();}
  function openControl(open){panel.hidden=!open;launch.setAttribute('aria-expanded',String(open));if(!open)sliding=false;}
  function updateControl(){const hide=controlBlocked();if(control.hidden!==hide)control.hidden=hide;if(hide&&!panel.hidden)openControl(false);if(!sliding){range.value=String(groupSize);setText(panel.querySelector('[data-cat-preview]'),String(groupSize));}setText(control.querySelector('[data-cat-count]'),String(groupSize));setText(control.querySelector('[data-cat-act=sleep]'),sleeping?'Đánh thức':'Cho mèo ngủ');control.querySelector('[data-cat-size]').value=prefs.size;control.querySelector('[data-cat-eco]').checked=prefs.eco;setText(control.querySelector('[data-cat-status]'),sleeping?'Mèo đang ngủ':visiting?'Đang đi chơi · '+cats.size+' mèo':'Đang nghỉ · số đã chọn áp dụng lượt sau');}
  function createCat(slot){
    const host=document.createElement('div');++serial;const coat=pickCoat();if(typeof v9CatSeen==='function')v9CatSeen(coat.id);
    host.className='nyan-pet';host.hidden=true;host.dataset.pose='walk';host.dataset.slot=String(slot);host.dataset.coat=coat.id;
    host.innerHTML=colorArt(`<button type="button" class="pet-touch" aria-label="${coat.name}; giữ để vuốt ve, kéo để nhấc mèo" title="${coat.name} · giữ để vuốt ve · kéo để nhấc"><svg class="pet-art" viewBox="0 0 140 110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <defs>
   <g id="pet-head"><path d="M-29-8-32-29Q-33-35-27-32L-9-21Q0-24 9-21L27-32Q33-35 32-29L29-8Q36 0 32 12Q27 27 0 27Q-27 27-32 12Q-36 0-29-8Z" fill="#fff0d6" stroke="#304b3b" stroke-width="3.2" stroke-linejoin="round"/><path d="m-26-26 2 15 12-8m38-7-2 15-12-8" fill="#eab9b7"/><path d="M-4-21q-2 6 1 10m7-10q2 6-1 10" fill="none" stroke="#d6bfa4" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="-21" cy="11" rx="7" ry="4" fill="#eebdb8"/><ellipse cx="21" cy="11" rx="7" ry="4" fill="#eebdb8"/><path d="m-3 10 3 3 3-3m-3 3q-3 6-8 3m8-3q3 6 8 3M-29 5l-6-2m6 7-6 1M29 5l6-2m-6 7 6 1" fill="none" stroke="#304b3b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></g>
   <g id="pet-eyes"><ellipse cx="-13" cy="2" rx="3.7" ry="5.6" fill="#304b3b"/><ellipse cx="13" cy="2" rx="3.7" ry="5.6" fill="#304b3b"/><circle cx="-14" cy="0" r="1.3" fill="white"/><circle cx="12" cy="0" r="1.3" fill="white"/></g>
   <g id="pet-happy-eyes"><path d="M-20 4q7-8 14 0M6 4q7-8 14 0" fill="none" stroke="#304b3b" stroke-width="2.8" stroke-linecap="round"/></g>
  </defs>
  <g class="pose pose-walk"><ellipse cx="72" cy="96" rx="47" ry="5" fill="#304b3b" opacity=".17"/><g class="pet-body" stroke="#304b3b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><g class="walk-tail"><path d="M48 70Q18 78 14 56Q12 43 25 45" stroke-width="12" fill="none"/><path d="M48 70Q18 78 14 56Q12 43 25 45" stroke="#e8d4b5" stroke-width="7" fill="none"/></g><path class="walk-leg alt" d="M50 76v14q5 8 12 0V76" fill="#e9d7bb"/><path class="walk-leg" d="M93 76v14q5 8 12 0V76" fill="#e9d7bb"/><ellipse cx="74" cy="72" rx="34" ry="20" fill="#f5e5c8"/><path class="walk-leg" d="M44 78v14q6 8 13 0V78" fill="#fff0d6"/><path class="walk-leg alt" d="M85 78v14q6 8 13 0V78" fill="#fff0d6"/><path d="M75 66q14 8 28-3l-1 10q-13 9-27 2Z" fill="#769e80"/><path d="m79 72-7 13 10-3 7 5 2-12" fill="#769e80"/><g transform="translate(93 43)"><use href="#pet-head"/><use href="#pet-eyes"/></g></g></g>
  <g class="pose pose-belly" stroke="#304b3b" stroke-width="3" stroke-linejoin="round"><ellipse cx="70" cy="94" rx="48" ry="5" fill="#304b3b" opacity=".16" stroke="none"/><path d="M31 74Q10 57 15 43" fill="none" stroke="#304b3b" stroke-width="11" stroke-linecap="round"/><path d="M31 74Q10 57 15 43" fill="none" stroke="#ead7b9" stroke-width="6" stroke-linecap="round"/><ellipse cx="62" cy="70" rx="37" ry="24" transform="rotate(-12 62 70)" fill="#f5e5c8"/><ellipse cx="60" cy="69" rx="24" ry="16" transform="rotate(-12 60 69)" fill="#fff4df" stroke="none"/><g fill="#fff0d6"><ellipse cx="35" cy="48" rx="11" ry="8" transform="rotate(-35 35 48)"/><ellipse cx="38" cy="86" rx="10" ry="8" transform="rotate(24 38 86)"/><ellipse cx="76" cy="44" rx="10" ry="8" transform="rotate(-20 76 44)"/><ellipse cx="78" cy="88" rx="10" ry="8" transform="rotate(20 78 88)"/></g><g fill="#eab9b7" stroke="none"><ellipse cx="35" cy="48" rx="5" ry="4"/><ellipse cx="38" cy="86" rx="5" ry="4"/><ellipse cx="76" cy="44" rx="5" ry="4"/><ellipse cx="78" cy="88" rx="5" ry="4"/></g><path d="M76 58q12 7 17 20l-9 5q-6-13-18-17Z" fill="#769e80"/><g transform="translate(103 64) rotate(67) scale(.83)"><use href="#pet-head"/><use href="#pet-happy-eyes"/></g><g class="pet-love" fill="#d97c91" stroke="none"><path d="M63 16q-9-9-14-2-6 7 14 17 20-10 14-17-5-7-14 2Z"/><path d="M90 12q-5-5-8-1-3 4 8 10 11-6 8-10-3-4-8 1Z"/></g></g>
  <g class="pose pose-groom" stroke="#304b3b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="70" cy="97" rx="39" ry="5" fill="#304b3b" opacity=".16" stroke="none"/>
    <path d="M52 83Q18 96 18 73Q18 62 31 64" fill="none" stroke-width="11"/><path d="M52 83Q18 96 18 73Q18 62 31 64" stroke="#e8d4b5" fill="none" stroke-width="6"/>
    <ellipse cx="62" cy="75" rx="27" ry="23" fill="#f5e5c8"/><path d="M43 91q-8 5 2 7h19q5-5-4-9" fill="#fff0d6"/><ellipse cx="73" cy="76" rx="13" ry="17" fill="#fff4df" stroke="none"/>
    <path d="M56 62q17 8 33-2l-1 9q-17 8-31 2Z" fill="#769e80"/><path d="m63 69-6 13 8-3 6 4 2-12" fill="#769e80"/>
    <g transform="translate(85 43)"><g class="groom-head"><use href="#pet-head"/><use href="#pet-happy-eyes"/><ellipse class="groom-tongue" cx="0" cy="19" rx="4" ry="7" fill="#ef9eaa" stroke="none"/></g></g>
    <g class="groom-paw"><path d="M79 85q11-4 16-16l-1-5q-4-5-10 0l-8 10" fill="#fff0d6"/><path d="M87 67l2 2m2-3 2 2" stroke-width="1.3"/></g>
  </g>
  <g class="pose pose-carry" stroke="#304b3b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M81 76q24 10 22-13" fill="none" stroke="#304b3b" stroke-width="11"/><path d="M81 76q24 10 22-13" fill="none" stroke="#ead7b9" stroke-width="6"/><ellipse cx="70" cy="72" rx="23" ry="26" fill="#f5e5c8"/><path d="M49 61q-10 12-4 24 5 6 10-2m36-22q10 12 4 24-5 6-10-2M55 86v12q6 8 13 0v-9m7 0v9q7 8 13 0V86" fill="#fff0d6"/><path d="M48 53q22 11 44 0v10q-22 12-44 0Z" fill="#769e80"/><path d="m80 62 3 18-8-4-5 5 1-15" fill="#769e80"/><g transform="translate(70 32)"><use href="#pet-head"/><use href="#pet-eyes"/></g></g>
  </svg></button><button type="button" class="pet-dismiss" aria-label="Cho NYAN về nghỉ" title="Cho NYAN về nghỉ">×</button>` .replace(/\bpet-(?:head|eyes|happy-eyes)\b/g,id=>`${id}-${serial}`),coat);
    layer.append(host);
    const touch=host.querySelector('.pet-touch');
    let phase='visit',entering=false,pose='walk',x=0,y=0,targetX=0,targetY=0,face=1,frame=0,lastFrame=0,poseUntil=0,walkUntil=0,exitAt=0,held=null;
    const speed=random(38,59);
    const size=()=>({w:host.offsetWidth||(innerWidth<=600?92:116),h:host.offsetHeight||(innerWidth<=600?82:100)});
    // Viewport coordinates, independent of scroll and content columns. Full sprite stays on-screen.
    const limits=()=>{const {w,h}=size();const top=Math.max(0,document.querySelector('.topbar')?.getBoundingClientRect().bottom||0),nav=document.querySelector('#ui91-bottom'),bottom=nav&&nav.getBoundingClientRect().height>0?nav.getBoundingClientRect().height:0;const maxY=Math.max(0,document.documentElement.clientHeight-h-bottom);return {minX:0,maxX:Math.max(0,document.documentElement.clientWidth-w),minY:Math.min(maxY,top),maxY};};
    function setPose(v){pose=v;host.dataset.pose=v;}
    function paint(){host.style.transform=`translate3d(${Math.round(x)}px,${Math.round(y)}px,0)`;host.style.setProperty('--facing',face);}
    function cancelHold(){const old=held;held=null;host.classList.remove('is-held');if(old&&touch.hasPointerCapture(old.id))try{touch.releasePointerCapture(old.id);}catch{} }
    function stopFrame(){if(frame)cancelAnimationFrame(frame);frame=0;lastFrame=0;}
    function chooseTarget(){const l=limits();
      // Each cat draws its own 2D destination and duration. No shared lanes or group snapping.
      let best=null;
      for(let i=0;i<8;i++){
        const a=random(0,Math.PI*2),d=random(130,380),tx=clamp(x+Math.cos(a)*d,l.minX,l.maxX),ty=clamp(y+Math.sin(a)*d,l.minY,l.maxY);
        const distance=Math.hypot(tx-x,ty-y);
        const crowd=[...cats].some(c=>c!==api&&c.near(tx,ty));
        if(!best||distance>best.distance)best={tx,ty,distance};
        if(distance>75&&!crowd){best={tx,ty,distance};break;}
      }
      targetX=best.tx;targetY=best.ty;if(Math.abs(targetX-x)>4)face=targetX<x?-1:1;
      walkUntil=elapsed+random(4500,9500);
    }
    function walk(){setPose('walk');chooseTarget();}
    function groom(){setPose('groom');poseUntil=elapsed+random(2400,4200);}
    function rest(){setPose('idle');poseUntil=elapsed+random(1300,2000);}
    function show(first=false){if(phase!=='visit')return;host.hidden=false;host.style.opacity='1';if(first){const l=limits(),left=Math.random()<.5;targetX=left?Math.min(l.maxX,random(12,100)):Math.max(0,l.maxX-random(12,100));targetY=random(l.minY,l.maxY);x=reduced.matches?targetX:(left?-size().w-14:l.maxX+size().w+14);y=targetY;face=left?1:-1;entering=!reduced.matches;host.dataset.entering=String(entering);}if(reduced.matches){setPose('idle');}else if(entering){setPose('walk');}else walk();paint();startFrame();}
    function startFrame(){if(!frame&&!host.hidden&&!blockedBefore&&!(reduced.matches&&pose==='idle'&&!held))frame=requestAnimationFrame(move);}
    function finish(){if(phase==='done')return;cancelHold();phase='done';stopFrame();host.remove();cats.delete(api);}
    function leave(){if(phase!=='visit')return;cancelHold();if(reduced.matches||blocked()){finish();return;}phase='leaving';entering=false;host.dataset.entering='false';exitAt=elapsed+EXIT_MS;host.classList.add('leaving');targetX=x<innerWidth/2?-(size().w+12):innerWidth+12;face=targetX<x?-1:1;setPose('walk');startFrame();}
    function move(t){frame=0;if(host.hidden||blockedBefore||phase==='done')return;if(ecoMode()&&lastFrame&&t-lastFrame<48){startFrame();return;}const dt=lastFrame?Math.min(.09,(t-lastFrame)/1000):0;lastFrame=t;
      if(phase==='leaving'){const dx=targetX-x;x+=Math.sign(dx)*Math.min(Math.abs(dx),Math.max(180,innerWidth*.65)*dt);if(Math.abs(targetX-x)<1){finish();return;}}
      else if(entering&&!held){const dx=targetX-x,step=Math.min(Math.abs(dx),170*dt);x+=Math.sign(dx)*step;if(Math.abs(targetX-x)<1){entering=false;host.dataset.entering='false';walk();}}
      else if(!held){
        if(pose==='roll'&&elapsed>=poseUntil){rest();}
        else if(pose==='idle'&&!reduced.matches&&elapsed>=poseUntil){walk();}
        else if(pose==='groom'&&elapsed>=poseUntil){walk();}
        else if(pose==='walk'){
          if(reduced.matches){setPose('idle');}
          else {const dx=targetX-x,dy=targetY-y,d=Math.hypot(dx,dy),step=Math.min(d,speed*dt);
            if(d<1||elapsed>=walkUntil){groom();}
            else {x+=dx/d*step;y+=dy/d*step;}
          }
        }
      }
      paint();startFrame();
    }
    function update(paused){if(phase==='done')return;if(paused){if(phase==='leaving'){finish();return;}if(!host.hidden){cancelHold();setPose('idle');host.hidden=true;}stopFrame();return;}
      if(phase==='leaving'&&elapsed>=exitAt){finish();return;}
      if(phase==='visit'&&host.hidden)show();startFrame();}
    touch.addEventListener('click',e=>{if(e.detail===0&&!held&&typeof ui91CatPhrase==='function')ui91CatPhrase(host);});
    touch.addEventListener('pointerdown',e=>{if(phase!=='visit'||held||e.button!==0)return;e.preventDefault();entering=false;host.dataset.entering='false';held={id:e.pointerId,sx:e.clientX,sy:e.clientY,drag:false,at:performance.now()};try{touch.setPointerCapture(e.pointerId);}catch{}host.classList.add('is-held');setPose('belly');});
    touch.addEventListener('pointermove',e=>{if(!held||held.id!==e.pointerId)return;const dx=e.clientX-held.sx,dy=e.clientY-held.sy;if(!held.drag&&Math.hypot(dx,dy)>10){held.drag=true;setPose('carry');}if(held.drag){const l=limits(),{w,h}=size();x=clamp(e.clientX-w*.5,l.minX,l.maxX);y=clamp(e.clientY-h*.18,l.minY,l.maxY);paint();}});
    function release(e){if(!held||e.pointerId!==held.id)return;const tap=e.type==='pointerup'&&!held.drag&&performance.now()-held.at<500;cancelHold();if(phase==='visit'){if(tap&&typeof ui91CatPhrase==='function')ui91CatPhrase(host);const l=limits();x=clamp(x,l.minX,l.maxX);y=clamp(y,l.minY,l.maxY);paint();setPose('roll');poseUntil=elapsed+(reduced.matches?0:ROLL_MS);startFrame();}}
    touch.addEventListener('pointerup',release);touch.addEventListener('pointercancel',release);touch.addEventListener('lostpointercapture',release);
    touch.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat&&phase==='visit'&&!held){e.preventDefault();setPose('belly');}});
    touch.addEventListener('keyup',e=>{if((e.key==='Enter'||e.key===' ')&&phase==='visit'&&!held){e.preventDefault();setPose('roll');poseUntil=elapsed+ROLL_MS;if(typeof ui91CatPhrase==='function')ui91CatPhrase(host);}});
    touch.addEventListener('blur',()=>{if(!held&&pose==='belly'){setPose('roll');poseUntil=elapsed+ROLL_MS;}});
    host.querySelector('.pet-dismiss').addEventListener('click',leave);
    function resize(){if(phase==='visit'){const l=limits();if(entering){entering=false;host.dataset.entering='false';walk();}x=clamp(x,l.minX,l.maxX);y=clamp(y,l.minY,l.maxY);targetX=clamp(targetX,l.minX,l.maxX);targetY=clamp(targetY,l.minY,l.maxY);paint();}}
    const api={update,finish,leave,resize,near:(tx,ty)=>phase==='visit'&&!host.hidden&&Math.hypot(tx-x,ty-y)<size().w*.85};
    cats.add(api);show(true);return api;
  }
  let lastProfile=activeProfile.id;
  function tick(){if(lastProfile!==activeProfile.id){lastProfile=activeProfile.id;for(const cat of cats)cat.finish();usedCoats.clear();groupSize=1;round=-1;elapsed=0;blockedBefore=true;last=performance.now();}const now=performance.now(),paused=blocked();if(!paused&&!blockedBefore)elapsed+=Math.max(0,now-last);last=now;blockedBefore=paused;
    if(paused){for(const cat of cats)cat.update(true);updateControl();return;}
    const current=Math.floor(elapsed/VISIT_EVERY),inVisit=elapsed%VISIT_EVERY<VISIT_LENGTH;
    if(current!==round){for(const cat of cats)cat.finish();round=current;usedCoats.clear();visiting=inVisit;if(inVisit)for(let i=0;i<groupSize;i++)createCat(i);}
    else if(visiting&&!inVisit){visiting=false;for(const cat of cats)cat.leave();}
    for(const cat of cats)cat.update(false);updateControl();
  }
  function setGroup(n,announce=false){tick();if(controlBlocked())return false;const next=clamp(Math.round(Number(n)||0),0,MAX_CATS);if(sleeping&&next>0&&next>=groupSize)toggle.click();groupSize=next;persist();applyPetPrefs();if(visiting&&!blocked()){while(cats.size>next)[...cats].at(-1).finish();while(cats.size<next)createCat(cats.size);}else if(next===0){for(const cat of cats)cat.finish();}for(const cat of cats)cat.resize();updateControl();if(announce)say('Đã chọn '+next+' mèo.'+(visiting?'':' Áp dụng lượt đi chơi tiếp theo.'));return true;}
  window.nyanSummonCat=(announce=false)=>{if(groupSize>=MAX_CATS){if(announce)say('Đã đủ 50 mèo.');return false;}return setGroup(groupSize+1,announce);};
  window.nyanSummonAllCats=()=>setGroup(MAX_CATS,true);
  launch.addEventListener('click',()=>openControl(panel.hidden));
  control.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.catDelta!==undefined)setGroup(groupSize+Number(b.dataset.catDelta));switch(b.dataset.catAct){case 'close':openControl(false);launch.focus();break;case 'all':setGroup(MAX_CATS,true);break;case 'zero':setGroup(0,true);break;case 'sleep':toggle.click();break;}});
  range.addEventListener('pointerdown',()=>{sliding=true;});
  range.addEventListener('input',()=>{sliding=true;setText(panel.querySelector('[data-cat-preview]'),range.value);});
  range.addEventListener('change',()=>{const next=Number(range.value);sliding=false;setGroup(next,true);});
  range.addEventListener('pointercancel',()=>{sliding=false;updateControl();});
  range.addEventListener('blur',()=>{sliding=false;updateControl();});
  control.querySelector('[data-cat-size]').addEventListener('change',e=>{prefs.size=e.target.value;persist();applyPetPrefs();for(const cat of cats)cat.resize();});
  control.querySelector('[data-cat-eco]').addEventListener('change',e=>{prefs.eco=e.target.checked;persist();applyPetPrefs();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){openControl(false);launch.focus();}});
  window.addEventListener('keydown',e=>{
    if(e.defaultPrevented||e.repeat||e.isComposing||!e.ctrlKey||!e.altKey||e.shiftKey||e.metaKey||e.code!=='KeyM'||e.getModifierState('AltGraph'))return;
    if(e.target instanceof Element&&e.target.closest('input,textarea,select,[contenteditable]:not([contenteditable=false])'))return;
    if(window.nyanSummonCat())e.preventDefault();
  });
  window.addEventListener('resize',()=>{for(const cat of cats)cat.resize();});
  window.addEventListener('hashchange',tick);document.addEventListener('visibilitychange',tick);
  const main=document.querySelector('main');new MutationObserver(tick).observe(main,{childList:true});
  function renderToggle(){toggle.textContent=sleeping?'Mèo dậy đi chơi':'Mèo đi ngủ';toggle.setAttribute('aria-pressed',String(sleeping));toggle.title=sleeping?'Hiện mèo đi dạo':'Ẩn mèo đi dạo';document.documentElement.classList.toggle('pets-asleep',sleeping);}
  toggle.addEventListener('click',()=>{sleeping=!sleeping;try{localStorage.setItem(sleepKey,sleeping?'1':'0');}catch{}for(const cat of cats)cat.finish();elapsed=0;round=-1;visiting=false;last=performance.now();blockedBefore=true;renderToggle();tick();});
  applyPetPrefs();renderToggle();setInterval(tick,100);tick();
  // Hero: crossfade to a hand-drawn happy expression, hearts, gentle squash.
  let heroTimer=0;
  function react(btn,ms=650){clearTimeout(heroTimer);btn.classList.add('is-petted');heroTimer=setTimeout(()=>btn.classList.remove('is-petted'),ms);}
  main.addEventListener('pointerdown',e=>{const btn=e.target.closest('.hero-cat');if(btn&&e.button===0){clearTimeout(heroTimer);btn.classList.add('is-petted');btn.setPointerCapture(e.pointerId);}});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])main.addEventListener(event,e=>{const btn=e.target.closest('.hero-cat');if(btn)react(btn);});
  main.addEventListener('click',e=>{const btn=e.target.closest('.hero-cat');if(btn)react(btn);});
})();
